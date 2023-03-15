from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer
from api_mantenimientos.serializers import AlmacenSerializer

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
        print("articulo")
        print(instance.articulo.id)
        # print(instance.articulo.id)
        variantes = ArticuloVariante.objects.filter(id=instance.articulo.id)
        # articulo = Articulo.objects.filter(variantes=instance.articulo.id)
        # ser_articulo = ArticuloSerializer(articulo, many=True)
        ser_variantes = ArticuloVarianteSerializer(variantes, many=True)
        # print(ser_articulo.data)
        return{
            'id':instance.id,
            'cantidad':instance.cantidad,
            'articulo':ser_variantes.data if instance.articulo else None,
            # 'articulo_imagen':ser_articulo.data.imagen if instance.articulo else None,
            # 'articulo_variante': ser_articulo
            # 'articulo_id':ser_articulo.data.id,
            # 'articulo_nombre':ser_articulo.data.nombre,
            # 'variante':instance.articulo,
            'borrado':instance.borrado,
        }    


class PVSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto_variante
        fields = ['id', 'nombre','descripcion', 'almacen', 'color', 'talla', 'horas_manufactura', 'costo_manufactura', 'gastos_generales', 'precio_final', 'borrado', 'producto_detalle']
        depth = 4
    # def to_representation(self, instance):
    #     detalle = Producto_detalle.objects.filter(variante=instance.id)
    #     ser_detalle = Producto_detalleSerializer(detalle, many=True)
    #     operacion = (float(instance.horas_manufactura)*float(instance.costo_manufactura))+float(instance.gastos_generales)
    #     if instance.almacen:
    #         almacen = Almacen.objects.get(id=instance.almacen.id)
    #         ser_almacen = AlmacenSerializer(almacen) 
    #     return{
    #         'id':instance.id,
    #         'nombre':instance.nombre,
    #         'descripcion':instance.descripcion,
    #         # 'almacen_nombre':instance.almacen.nombre,
    #         'almacen':ser_almacen.data if instance.almacen else None,
    #         'color':instance.color,
    #         'talla':instance.talla,
    #         'horas_manufactura':instance.horas_manufactura,
    #         'costo_manufactura':instance.costo_manufactura,
    #         'gastos_generales':instance.gastos_generales,
    #         'precio_final':operacion,
    #         # 'producto': instance.producto.nombre,
    #         # 'categoria':instance.producto.categoria.id if instance.producto.categoria else None,
    #         # 'imagen': "http://localhost:8000"+instance.producto.imagen.url,
    #         'producto_detalle':ser_detalle.data,
            
    #     }

class Producto_varianteSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    class Meta:
        model = Producto_variante
        fields = "__all__"
    
    def to_representation(self, instance):
        detalle = Producto_detalle.objects.filter(variante=instance.id)
        ser_detalle = Producto_detalleSerializer(detalle, many=True)
        operacion = (float(instance.horas_manufactura)*float(instance.costo_manufactura))+float(instance.gastos_generales)
        if instance.almacen:
            almacen = Almacen.objects.get(id=instance.almacen.id)
            ser_almacen = AlmacenSerializer(almacen)
        return{
            'id':instance.id,
            'nombre':instance.nombre,
            'descripcion':instance.descripcion,
            'almacen':ser_almacen.data if instance.almacen else None,
            'color':instance.color,
            'talla':instance.talla,
            'horas_manufactura':instance.horas_manufactura,
            'costo_manufactura':instance.costo_manufactura,
            'gastos_generales':instance.gastos_generales,
            'precio_final':operacion,
            'producto': instance.producto.id,
            'imagen': "http://localhost:8000"+instance.producto.imagen.url,
            'producto_detalle' : ser_detalle.data
            
        }

# class ProductoSerializer(serializers.ModelSerializer):
class ProductoSerializer(WritableNestedModelSerializer):
    producto_variante = Producto_varianteSerializer(many=True)
    class Meta:
        model = Producto
        fields = ['id','codigo', 'nombre', 'cantidad', 'descripcion_producto', 'categoria','imagen', 'borrado', 'producto_variante']

    def to_representation(self, instance):
        producto_variante = Producto_variante.objects.filter(producto=instance.id)
        ser_producto_variante = PVSerializer(producto_variante, many=True)
        if instance.categoria:
            categoria = Categoria_producto.objects.get(id=instance.categoria.id)
            ser_categoria = CatSerializer(categoria)
        return{
            'id': instance.id,
            'codigo':instance.codigo,
            'nombre' : instance.nombre,
            'cantidad' : instance.cantidad,
            'descripcion_producto' : instance.descripcion_producto,
            'nombre_categoria':instance.categoria.nombre if instance.categoria else None,
            'categoria' : ser_categoria.data if instance.categoria else None,
            'imagen' : "http://localhost:8000"+instance.imagen.url,
            'borrado' : instance.borrado,
            'producto_variante': ser_producto_variante.data
        }


