from django.shortcuts import render

from api_models.models import Formapago, Provincias, Entidades, Impuestos, Embalajes, Categoria
from api_mantenimientos.serializers import *
from rest_framework import viewsets, permissions

# Create your views here.
class ProvinciasViewSet(viewsets.ModelViewSet):
    queryset = Provincias.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = ProviciasSerializer

class EntidadesViewSet(viewsets.ModelViewSet):
    queryset = Entidades.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EntidadesSerializer

class ImpuestosViewSet(viewsets.ModelViewSet):
    queryset = Impuestos.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = ImpuestosSerializer

class EmbalajesViewSet(viewsets.ModelViewSet):
    queryset = Embalajes.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EmbalajesSerializer

class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = Formapago.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = FormapagoSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer