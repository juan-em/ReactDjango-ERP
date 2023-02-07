from django.shortcuts import render

from api_models.models import (
    Formapago, 
    Provincias, 
    Entidades, 
    Impuestos, 
    Embalajes, 
    Categoria
)
from api_mantenimientos.serializers import *
from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@permission_classes([IsAuthenticated]) #It's important to add a decorator if we want to restrict some routes to the user
class ProvinciasViewSet(viewsets.ModelViewSet):
    queryset = Provincias.objects.all()
    serializer_class = ProviciasSerializer

@permission_classes([IsAuthenticated])
class EntidadesViewSet(viewsets.ModelViewSet):
    queryset = Entidades.objects.all()
    serializer_class = EntidadesSerializer

@permission_classes([IsAuthenticated])
class ImpuestosViewSet(viewsets.ModelViewSet):
    queryset = Impuestos.objects.all()
    serializer_class = ImpuestosSerializer

@permission_classes([IsAuthenticated])
class EmbalajesViewSet(viewsets.ModelViewSet):
    queryset = Embalajes.objects.all()
    serializer_class = EmbalajesSerializer

@permission_classes([IsAuthenticated])
class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = Formapago.objects.all()
    serializer_class = FormapagoSerializer

@permission_classes([IsAuthenticated])
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer