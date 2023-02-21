from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer


#Import Models
from api_models.models import (
    Producto, Producto_detalle, Articulo, ArticuloVariante
)
from api_articulos.serializers import *

#Import Serializer

class Producto_detalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto_detalle
        fields = '__all__'

class PDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto_detalle
        exclude = ('producto',)
        depth = 2

    def to_representation(self, instance):
        variantes = ArticuloVariante.objects.filter(articulo=instance.id)
        ser_variantes = AVSerializer(variantes, many=True)
        return{
            'articulo':ser_variantes.data,
            'cantidad':instance.cantidad,
            'borrado':instance.borrado,
        }


class ProductoSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto
        fields = '__all__'

    def to_representation(self, instance):
        producto_detalle = Producto_detalle.objects.filter(articulo=instance.id)
        ser_producto_detalle = PDSerializer(producto_detalle, many=True)
        return{
            'id': instance.id,
            'nombre':instance.nombre,
            'cantidad':instance.cantidad,
            'descripcion_producto':instance.descripcion_producto,
            'color':instance.color,
            'talla':instance.talla,
            'categoria':instance.categoria.nombre if instance.categoria else None,
            'horas_manufactura':instance.horas_manufactura,
            'costo_manufactura':instance.costo_manufactura,
            'gastos_generales':instance.gastos_generales,
            'precio_final':instance.precio_final,
            'borrado':instance.borrado,
            'producto_detalle': ser_producto_detalle.data
        }


