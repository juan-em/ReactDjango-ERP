from django.shortcuts import render
from django.utils import timezone

from .serializers import *
from api_models.models import *


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class CajaDiariaView(APIView):
    def get(self, request):
        data = Caja_diaria.objects.all()
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
        data = Caja_diaria.objects.get(id=id)
        serializer = CajaDiariaSerializer(data)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)
    
    def delete(self, request, id):
        data = Caja_diaria.objects.get(id=id)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 

    def patch(self, request, id):
        data = Caja_diaria.objects.get(id=id)
        if request.data["estado"] == False:
            movimientos = Caja_diaria_movimientos.objects.filter(caja_diaria = id)
            acumulado = data.monto_inicial
            for item in movimientos:
                acumulado += item.total_movimiento
            data.monto_final = acumulado
            data.fecha_cierre = timezone.now()
            data.estado = False
            data.save()
            
        serializer = CajaDiariaSerializer(data)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

class CajaDiariaMovimientosView(APIView):
    def get(self, request, id):
        data = Caja_diaria_movimientos.objects.filter(caja_diaria=id)
        serializer = CajaDiariaMovimientosSerializer(data, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)
    
