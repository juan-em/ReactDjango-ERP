from django.shortcuts import render

#Import Models
from api_models.models import (
   Articulos, Producto, Producto_detalle
)
# Create your views here.

from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response



class ArticulosView(APIView):
    def get(self, request):
        dataArticulo = Articulos.objects.filter(borrado=False)
        serializer = ArticuloSerializer(dataArticulo, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

class ArticuloDetailView(APIView):
    def get(self, request,id):
        dataArticulo = Articulos.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def put(self, request, id):
        dataArticulo = Articulos.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo, data=request.data)
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
        dataArticulo = Articulos.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo, data=request.data)
        dataArticulo.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)


class Producto_detallelView(APIView):
    def get(self, request):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False)
        serializer = Producto_detalleSerializer(dataProducto_detalle, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

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
        serializer = ProductoSerializer(data=request.data)

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
        serializer = ProductoSerializer(dataProducto, data=request.data)
        dataProducto.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)

