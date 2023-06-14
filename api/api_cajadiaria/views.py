from . serializers import *
from . models import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class CajaDiariaView(APIView):
    def get(self, request):
        data = Caja_Diaria.objects.all()
        serializer = CajaDiariaSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)
    
    def post(self, request):
        serializer = CajaDiariaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        
        return Response(context)

class CajaDiariaDetailView(APIView):
    def get(self, request, id):
        data = Caja_Diaria.objects.get(id=id)
        serializer = CajaDiariaSerializer(data)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)
    
    def patch(self, resquest, id):
        dataCaja = Caja_Diaria.objects.get(id=id)
        serializer = CajaDiariaSerializer(dataCaja, data=resquest.data, partial=True)

        dataCaja.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)

    def delete(self, request, id):
        data = Caja_Diaria.objects.get(id=id)
        data.delete()
        
        context = {
            'status':True,
            'message':'Delete success',
        }
        
        return Response(context)

class IngresoVentaView(APIView):
    def get(self, request):
        data = Ingreso_Venta.objects.all()
        serializer = IngresosVentaSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        serializer = IngresosVentaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)

class IngresosOtrosView(APIView):
    def get(self, request):
        data = Ingresos_Otros.objects.all()
        serializer = IngresosOtrosSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        serializer = IngresosOtrosSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)