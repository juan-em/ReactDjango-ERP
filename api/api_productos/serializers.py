from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer


#Import Models
from api_models.models import (
    Producto, Producto_detalle, Articulo, ArticuloVariante, Producto_variante
)
from api_articulos.serializers import *

#Import Serializer
class Producto_detalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto_detalle
        fields = ['id', 'cantidad', 'articulo', 'borrado']

    def to_representation(self, instance):
        variantes = ArticuloVariante.objects.filter(articulo=instance.articulo.id)
        articulo = Articulo.objects.filter(pk=instance.articulo.id)
        ser_articulo = ArticuloSerializer(articulo, many=True)
        return{
            'id':instance.id,
            'cantidad':instance.cantidad,
            'articulo':ser_articulo.data,
            'borrado':instance.borrado,
        }    


class PVSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto_variante
        fields = ['id', 'nombre', 'descripcion', 'almacen', 'color', 'talla', 'horas_manufactura', 'costo_manufactura', 'gastos_generales', 'precio_final', 'borrado', 'producto_detalle']
        depth = 4
    def to_representation(self, instance):
        detalle = Producto_detalle.objects.filter(variante=instance.id)
        ser_detalle = Producto_detalleSerializer(detalle, many=True)
        operacion = (float(instance.horas_manufactura)*float(instance.costo_manufactura))+float(instance.gastos_generales)
        print(operacion)
        return{
            'id':instance.id,
            'nombre':instance.nombre,
            'descripcion':instance.descripcion,
            'almacen':instance.almacen.nombre,
            'color':instance.color,
            'talla':instance.talla,
            'horas_manufactura':instance.horas_manufactura,
            'costo_manufactura':instance.costo_manufactura,
            'gastos_generales':instance.gastos_generales,
            'precio_final':operacion,
            'producto': instance.producto.nombre,
            'imagen': "http://localhost:8000"+instance.producto.imagen.url,
            
        }

class Producto_varianteSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto_variante
        fields = ['id', 'nombre', 'descripcion', 'almacen', 'color', 'talla', 'horas_manufactura', 'costo_manufactura', 'gastos_generales', 'precio_final', 'borrado', 'producto_detalle']

# class ProductoSerializer(serializers.ModelSerializer):
class ProductoSerializer(WritableNestedModelSerializer):
    producto_variante = Producto_varianteSerializer(many=True)
    class Meta:
        model = Producto
        fields = ['id','codigo', 'nombre', 'cantidad', 'descripcion_producto', 'categoria','imagen', 'borrado', 'producto_variante']

    def to_representation(self, instance):
        producto_variante = Producto_variante.objects.filter(producto=instance.id)
        ser_producto_variante = Producto_varianteSerializer(producto_variante, many=True)
        return{
            'id': instance.id,
            'codigo':instance.codigo,
            'nombre' : instance.nombre,
            'cantidad' : instance.cantidad,
            'descripcion_producto' : instance.descripcion_producto,
            'categoria' : instance.categoria.nombre if instance.categoria else None,
            'imagen' : "http://localhost:8000"+instance.imagen.url,
            'borrado' : instance.borrado,
            'producto_variante': ser_producto_variante.data
        }


