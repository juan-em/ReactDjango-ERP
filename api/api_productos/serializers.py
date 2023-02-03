from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer


#Import Models
from api_models.models import (
   Articulos, Producto, Producto_detalle
)

class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = '__all__'

class Producto_detalleSerializer(WritableNestedModelSerializer):
    articulo = ArticuloSerializer()
    class Meta:
        model = Producto_detalle
        fields = '__all__'

class ProductoSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto
        fields = '__all__'


