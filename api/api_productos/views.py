from django.shortcuts import render

#Import Models
from api_models.models import (
   Articulo, ArticuloVariante, Producto, Producto_detalle, Producto_variante
)
# Create your views here.

from .serializers import *

from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import JSONParser
from io import BytesIO
from django.http.request import QueryDict
from django.core.files.uploadedfile import InMemoryUploadedFile

def parse_querydict(qdict):
    parsed = {}
    for key, value in qdict.items():
        if "[" in key:
            main_key, sub_key = key.split("[")[:-1], key.split("[")[-1][:-1]
            if main_key not in parsed:
                parsed[main_key] = []
            if sub_key.isdigit():
                if len(parsed[main_key]) <= int(sub_key):
                    parsed[main_key].append({})
                parsed[main_key][int(sub_key)][sub_key] = value[0] if isinstance(value, list) else value
            else:
                parsed[main_key][-1][sub_key] = value[0] if isinstance(value, list) else value
        else:
            if isinstance(value, InMemoryUploadedFile):
                parsed[key] = value
            else:
                try:
                    parsed[key] = int(value[0])
                except ValueError:
                    try:
                        parsed[key] = float(value[0])
                    except ValueError:
                        parsed[key] = value[0]
    return parsed

# @permission_classes([IsAuthenticated])
class ProductoView(APIView):
    parse_classes = [MultiPartParser, FormParser, JSONParser]
    def get(self, request):
        dataProducto = Producto.objects.filter(borrado=False)
        serProducto = ProductoSerializer(dataProducto, many=True)
        context = {
            'status':True,
            'content':serProducto.data
        }        
        return Response(context)

    def post(self, request, format=None):
        # print('nested')
        print(request.data)
        print(parse_querydict(request.data))
        serializer = ProductoSerializer(data = parse_querydict(request.data))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        # try:
        #     serializer = ProductoSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         context = {
        #             'data':'OK',
        #             'status':status.HTTP_201_CREATED,
        #             'content':serializer.data
        #         }
        #         return Response(context)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as Error:
        #     print(Error)
        #     return Response({
        #         'status': False,
        #         'content': 'Error',
        #         'message': 'Internal server error'
        #     })             

# @permission_classes([IsAuthenticated])
class ProductoDetailView(APIView):
    def get(self, request, id):
        dataProduco = Producto.objects.filter(borrado=False).get(pk=id)
        serializer = ProductoSerializer(dataProduco)
        context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }
        return Response(context)
    
    def put(self, request, id):
        try:            
            dataProducto = Producto.objects.filter(borrado=False).get(pk=id)
            serializer = ProductoSerializer(dataProducto, data=parse_querydict(request.data), partial=True)
            if serializer.is_valid():
                serializer.save()
                context = {
                    'data':'OK',
                    'status':status.HTTP_201_CREATED,
                    'content':serializer.data
                }
                return Response(context)
        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            }) 

    
    def delete(self, request, id):
        dataProducto = Producto.objects.filter(borrado=False).get(pk=id)
        serializer = ProductoSerializer(dataProducto)
        dataProducto.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_varianteView(APIView):
    def post(self, request):
        try:
            serializer = ProductoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                context = {
                    'data':'OK',
                    'status':status.HTTP_201_CREATED,
                    'content':serializer.data
                }
                return Response(context)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            }) 

# @permission_classes([IsAuthenticated])
class Producto_varianteDetailView(APIView):

    def put(self, request, id):
        dataProducto_variante = Producto_variante.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_varianteSerializer(dataProducto_variante, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }    
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):
        dataProducto_variante = Producto_variante.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_varianteSerializer(dataProducto_variante)
        dataProducto_variante.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_detallelView(APIView):

    def post(self, request):
        serializer = Producto_detalleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_detalleDetailView(APIView):

    def put(self, request, id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }    
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle)
        dataProducto_detalle.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)



