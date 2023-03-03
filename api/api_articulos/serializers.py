from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class ArticuloVarianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloVariante
        fields = '__all__'

    def to_representation(self, instance):
        return{
            'id': instance.id,
            'nombre':instance.nombre,
            'articulo':instance.articulo.nombre,
            'categoria':instance.articulo.categoria.id if instance.articulo.categoria else None,
            'precio_unitario':instance.precio_unitario,
            'embalaje': instance.embalaje.id if instance.embalaje else None,
            'cantidad': instance.cantidad,
            'ubicacion': instance.ubicacion,
            'almacen': instance.almacen.id if instance.almacen else None,
            'descripcion': instance.descripcion,
            'imagen': "http://localhost:8000" + instance.articulo.imagen.url
        }

#Serializers for the representation (get)
class AVSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloVariante
        fields = ['id', 'codigo', 'nombre', 'precio_unitario', 'embalaje', 'cantidad', 'ubicacion', 'almacen', 'descripcion']
        depth = 2
class PVSerializer(serializers.ModelSerializer):
    class Meta:        
        model = Proveedores
        fields = '__all__'
        depth = 2
class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ArticuloSerializer(WritableNestedModelSerializer):
    variantes = ArticuloVarianteSerializer(many=True)
    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'proveedor', 'marca', 'categoria', 'imagen','variantes']

    def to_representation(self, instance):
        variantes = ArticuloVariante.objects.filter(articulo=instance.id)
        ser_variantes = AVSerializer(variantes, many=True)
        if instance.proveedor:
            proveedor = Proveedores.objects.get(id=instance.proveedor.id)
            ser_proveedor = PVSerializer(proveedor)
        if instance.categoria:
            categoria = Categoria.objects.get(id=instance.categoria.id)
            ser_categoria = CatSerializer(categoria)
        return{
            'id': instance.id,
            'codigo': instance.codigo,
            'nombre': instance.nombre,
            'descripcion': instance.descripcion,
            'proveedor':ser_proveedor.data if instance.proveedor else None,
            'nombre_proveedor': instance.nombre_proveedor if instance.proveedor else None,
            'marca': instance.marca,
            'nombre_categoria':instance.categoria.nombre if instance.categoria else None,
            'categoria': ser_categoria.data if instance.categoria else None,
            'imagen': "http://localhost:8000"+instance.imagen.url,
            'variantes': ser_variantes.data
        }
    


