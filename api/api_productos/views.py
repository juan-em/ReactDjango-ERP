from django.shortcuts import render

#Import Models
from api_models.models import (
   Articulo, ArticuloVariante, Producto, Producto_detalle
)
# Create your views here.

from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


# @permission_classes([IsAuthenticated])
class ProductoView(APIView):
    def get(self, request):
        dataProducto = Producto.objects.filter(borrado=False)
        serProducto = ProductoSerializer(dataProducto, many=True)
        context = {
            'status':True,
            'content':serProducto.data
        }        
        return Response(context)

    def post(self, request):
        try:
            # horas_manufactura = request.data.get('horas_manufactura')
            # costo_manufactura = request.data.get('costo_manufactura')
            # gastos_generales = request.data.get('gastos_generales')
            # precio_final = (costo_manufactura * horas_manufactura) + gastos_generales 
            # producto_data = {
            #     'nombre':request.data.get('nombre'),
            #     'cantidad':request.data.get('cantidad'),
            #     'descripcion_producto':request.data.get('descripcion_producto'),
            #     'color':request.data.get('color'),
            #     'talla':request.data.get('talla'),
            #     'categoria':request.data.get('categoria'),
            #     'horas_manufactura':horas_manufactura,
            #     'costo_manufactura':costo_manufactura,
            #     'gastos_generales':gastos_generales,
            #     'precio_final':precio_final
            # }
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
            horas_manufactura = request.data.get('horas_manufactura')
            costo_manufactura = request.data.get('costo_manufactura')
            gastos_generales = request.data.get('gastos_generales')
            precio_final = (costo_manufactura * horas_manufactura) + gastos_generales 
            producto_data = {
                'nombre':request.data.get('nombre'),
                'cantidad':request.data.get('cantidad'),
                'descripcion_producto':request.data.get('descripcion_producto'),
                'color':request.data.get('color'),
                'talla':request.data.get('talla'),
                'categoria':request.data.get('categoria'),
                'horas_manufactura':horas_manufactura,
                'costo_manufactura':costo_manufactura,
                'gastos_generales':gastos_generales,
                'precio_final':precio_final
            }
            serializer = ProductoSerializer(dataProducto, data=producto_data)
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

        dataProducto = Producto.objects.filter(borrado=False).get(pk=id)
        serializer = ProductoSerializer(dataProducto, data=request.data)
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
class Producto_detallelView(APIView):
    def get(self, request):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False)
        serializer = Producto_detalleSerializer(dataProducto_detalle, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

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
    def get(self, request,id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def put(self, request, id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle)
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



