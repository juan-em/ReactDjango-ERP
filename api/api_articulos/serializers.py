from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class ArticuloVarianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloVariante
        fields = '__all__'

    def to_representation(self, instance):
        return{
            'nombre':instance.nombre,
            'articulo':instance.articulo.nombre,
            'categoria':instance.articulo.categoria.id if instance.articulo.categoria else None,
            'precio_unitario':instance.precio_unitario,
            'embalaje': instance.embalaje.id if instance.embalaje else None,
            'cantidad': instance.cantidad,
            'ubicacion': instance.ubicacion,
            'almacen': instance.almacen.id if instance.almacen else None,
            'descripcion': instance.descripcion,
            'imagen': instance.articulo.imagen.url
        }


class AVSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloVariante
        exclude = ('articulo',)
        depth = 2


class ArticuloSerializer(WritableNestedModelSerializer):
    variantes = ArticuloVarianteSerializer(many=True)
    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'proveedor', 'marca', 'categoria', 'imagen','variantes']

    def to_representation(self, instance):
        variantes = ArticuloVariante.objects.filter(articulo=instance.id)
        ser_variantes = AVSerializer(variantes, many=True)
        return{
            'id': instance.id,
            'nombre': instance.nombre,
            'descripcion': instance.descripcion,
            'proveedor': instance.nombre_proveedor if instance.proveedor else None,
            'marca': instance.marca,
            'categoria':instance.categoria.nombre if instance.categoria else None,
            'imagen': "http://localhost:8000"+instance.imagen.url,
            'variantes': ser_variantes.data
        }
    


