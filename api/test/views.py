from django.shortcuts import render
from api_models.models import (
    Articulo,
    Compra,
    )
# Create your views here.
from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class ArticulosView(APIView):
    def get(self, request):
        dataArticulo = Articulo.objects.filter(borrado=False)
        serializer = ArticuloSerializer(dataArticulo, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

class ArticuloDetailView(APIView):
    def get(self, request, id):
        dataArticulo = Articulo.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)


class ComprasView(APIView):
    def get(self, request):
        dataCompras = Compra.objects.all()
        serializer = CompraSerializer(dataCompras, many=True)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

    def post(self, request):
        serializer = CompraSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class ComprasDetailView(APIView):
    def get(self, request, id):
        dataCompra = Compra.objects.get(id=id)
        serializer = CompraSerializer(dataCompra)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    
    def patch(self, request, id):
        dataCompra = Compra.objects.get(id=id)
        serCompra = CompraSerializer(dataCompra, data=request.data,
                                            partial=True)
        serCompra.is_valid(raise_exception=True)
        serCompra.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serCompra.data
        }
        
        return Response(context)
    
    def delete(self, request, id):
        data = Compra.objects.get(id=id)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 

class RemisionesView(APIView):

    def post(self, request):
        compra_id = request.data.pop('compra')
        isRemision = RemisionCompra.objects.filter(compra=compra_id)
        if not isRemision:
            remision = RemisionCompra()
            remision.compra_id = compra_id
            remision.save()
        else:
            remision = isRemision[0]
        
        lista_detalles_remision = request.data.get('remision_compra_detalle')
        for item in lista_detalles_remision:
            compra_detalle = CompraDetalle.objects.get(id=item["compra_detalle"])
            compra_detalle.remision_hecha = True
            compra_detalle.save()
            
            detalle_remision = RemisionDetalleCompra()
            detalle_remision.remision_compra=remision
            detalle_remision.compra_detalle=compra_detalle
            detalle_remision.save()

            entrada_almacen = EntradaAlmacenCompra.objects.create(remision=detalle_remision)
            entrada_almacen.save()
        
        return Response({'msg':True})


class RemisionDetailView(APIView):

    def delete(self, request, id):
        data = RemisionDetalleCompra.objects.get(id=id)
        compra_detalle = data.compra_detalle
        compra_detalle.remision_hecha = False
        compra_detalle.save()
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context)
    
class EntradasAlmacenComprasSerializer(APIView):
    
    def patch(self, request, id):
        data = EntradaAlmacenCompra.objects.get(id=id)
        serializer = CompraSerializer(data, data=request.data,
                                            partial=True)
        estado = request.data.get("estado", None)
        if estado == True:
            cantidad = data.remision.compra_detalle.cantidad
            unidad = data.remision.compra_detalle.unidad.valor if data.remision.compra_detalle.unidad else 1
            total = cantidad*unidad
            articuloVariante = data.remision.compra_detalle.articulo
            articuloVariante.cantidad = articuloVariante.cantidad + total
            articuloVariante.save()
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        
        return Response(context)