from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer


#Import Models
from api_models.models import (
   Articulos, Producto, Categoria
)

class CategoriaSerializer(serializers.ModeleSerializer):
    class Meta:
        model = Categoria
        fields = '__all__' 

class ArticuloSerializer(serializers.ModeleSerializer):
    class Meta:
        model = Articulos
        fields = '__all__'

class ProductoSerializer(WritableNestedModelSerializer):
    articulo = ArticuloSerializer()
    class Meta:
        model = Producto
        fields = '__all__'
