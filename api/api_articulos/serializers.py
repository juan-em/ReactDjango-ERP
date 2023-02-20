from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class ArticuloVarianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloVariante
        fields = '__all__'


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
            'imagen': instance.imagen.url,
            'variantes': ser_variantes.data
        }
    


