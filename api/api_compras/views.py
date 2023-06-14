from django.shortcuts import render
from api_models.models import *
# Create your views here.
from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.

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

        #registro caja
        # tipo_pago = request.data.pop('tipo_pago', None)
        
        serializer = CompraSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        #registro caja
        # if tipo_pago:
        #     data = {
        #         'tipo_movimiento': 'Compra',
        #         'compra': Compra.objects.get(id=serializer.data["id"]),
        #         'tipo_pago': Formapago.objects.get(id=tipo_pago),
        #         'caja_diaria': Caja_diaria.objects.get(estado=True)
        #     }
        #     cajaMovimiento = Caja_diaria_movimientos.objects.create(**data)
        #     cajaMovimiento.save()

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
        data.borrado = not data.borrado
        data.save()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 

class RemisionesView(APIView):
    def get(self, request):
        dataRemisiones = RemisionCompra.objects.all()
        serializer = RemisionesCompraSerializer(dataRemisiones, many=True)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

    def post(self, request):
        compra_id = request.data.pop('compra')
        
        remision = RemisionCompra()
        remision.compra_id = compra_id
        remision.save()

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
        
        compra = remision.compra
        serCompra = CompraSerializer(compra)
        context = {
            'status':True,
            'content':serCompra.data
        }

        return Response(context)

class RemisionDetailView(APIView):
    def delete(self, request, id):
        data = RemisionCompra.objects.get(id=id)
        for detalle_remision in data.remision_compra_detalle.all():
            compra_detalle = detalle_remision.compra_detalle
            compra_detalle.remision_hecha = False
            compra_detalle.save()
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context)

class RemisionDetalleDetailView(APIView):

    def delete(self, request, id):

        data = RemisionDetalleCompra.objects.get(id=id)
        totalRemsiones = RemisionDetalleCompra.objects.filter(remision_compra = data.remision_compra.id)
        if len(totalRemsiones) == 1:
           remision = data.remision_compra
           remision.delete()
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
            unidad = data.remision.compra_detalle.unidad if data.remision.compra_detalle.unidad else 1
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