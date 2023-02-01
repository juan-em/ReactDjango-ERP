from django.shortcuts import render

#Import models
from api_models.models import (
    Persona,Empresa, Clientes, Provincias, Formapago, Entidades
)
#Import serializer
from .serializers import *

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
        serPersona = PersonaSerializer(data=request.data)
        if serPersona.is_valid():
            serPersona.save()
            
        dataPersona = Persona.objects.last()
        print(dataPersona)
        persona_id = dataPersona.id
        clienteData = {
            'persona':persona_id,
            'codformapago':request.data.get('codformapago'),
        }
        serCliente = ClientePersonaSerilizer(data=clienteData)
        if serCliente.is_valid():
            serCliente.save()
        context = {
            'status':True,
            'persona': serPersona,
            'cliente': serCliente,
        }
        return Response(context)

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
        serEmpresa = EmpresaSerilizer(data=request.data)
        serEmpresa.is_valid(raise_exception=True)
        serEmpresa.save()
        dataEmpresa = Empresa.objects.last()
        serCliente = ClienteEmpresaSerilizer(data=request.data)
        serCliente.is_valid(raise_exception=True)
        request.data.get('')
        context = {
            'status':True,
            'serEmpresa': serEmpresa,
        }
        return Response(context)