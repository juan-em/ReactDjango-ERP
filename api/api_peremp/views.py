from django.shortcuts import render

#Import models
from api_models.models import (
    Persona,Empresa
)
#Import serializer
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class PersonaView(APIView):
    def get(self, request):
        dataPersona = Persona.objects.filter(borrado=False)
        serPersona = PersonaSerializer(dataPersona, many=True)
        context = {
            'status':True,
            'content':serPersona.data
        }
        return Response(context)
    
    def post(self, request):
        serPersona = PersonaSerializer(data=request.data)
        if serPersona.is_valid():
            serPersona.save()
        return Response(serPersona.data)

class EmpresaView(APIView):
    def get(self, request):
        dataEmpresa = Empresa.objects.filter(borrado=False)
        serEmpresa = EmpresaSerilizer(dataEmpresa, many=True)
        context = {
            'status':True,
            'content':serEmpresa.data
        }
        return Response(context)
    
    def post(self, request):
        serEmpresa = PersonaSerializer(data=request.data)
        if serEmpresa.is_valid():
            serEmpresa.save()
        
        return Response(serEmpresa.data)