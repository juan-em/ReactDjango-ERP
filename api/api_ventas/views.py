from django.shortcuts import render
from api_models.models import *
from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


class VentasView(APIView):
    def get(self, request):
        dataVentas = Venta.objects.all()
        serializer = VentaSerializer(dataVentas, many=True)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def post(self, request):
        serializer = VentaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)
    

class VentasDetailView(APIView):
    def get(self, request, id):
        data = Venta.objects.get(id=id)
        serializer = VentaSerializer(data)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def patch(self, request, id):
        data = Venta.objects.get(id=id)
        serializer = VentaSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        return Response(context)
    
    def delete(self, request, id):
        data = Venta.objects.get(id=id)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 
    


