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

# @permission_classes([IsAuthenticated])
class ProductoView(APIView):
    parse_classes = [MultiPartParser, FormParser]
    def get(self, request):
        dataProducto = Producto.objects.filter(borrado=False)
        serProducto = ProductoSerializer(dataProducto, many=True)
        context = {
            'status':True,
            'content':serProducto.data
        }        
        return Response(context)

    def post(self, request, format=None):
        print(request.data)
        serializer = ProductoSerializer(data = request.data)
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
            serializer = ProductoSerializer(dataProducto, data=request.data, partial=True)
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



