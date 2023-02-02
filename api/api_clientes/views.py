from django.shortcuts import render

#Import models
from api_models.models import (
    Persona,Empresa, Clientes, Provincias, Formapago, Entidades
)
#Import serializer
from .serializers import *

from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ClientePersonaView(APIView):
    def get(self, request):
        dataCliente = Clientes.objects.filter(borrado=False)
        serCliente = ClientePersonaSerilizer(dataCliente, many=True)
        context = {
            'status':True,
            'content':serCliente.data
        }
        return Response(context)
    
    def post(self, request):    
        serCliente = ClientePersonaSerilizer(data=request.data)
        
        if serCliente.is_valid():
            serCliente.save()
            return Response({'data': 'OK'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'data': 'ERROR'})

class ClienteEmpresaView(APIView):
    def get(self, request):
        dataEmpresa = Persona.objects.all()
        serEmpresa = PersonaSerializer(dataEmpresa, many=True)
        dataCliente = Clientes.objects.all()
        serCliente = ClienteEmpresaSerilizer(dataCliente, many=True)
        context = {
            'status':True,
            'content':serCliente.data
        }
        return Response(context)
    
    def post(self, request):
        serCliente = ClienteEmpresaSerilizer(data=request.data)
        
        if serCliente.is_valid():
            serCliente.save()
            return Response({'data': 'OK'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'data': 'ERROR'})