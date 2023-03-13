from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class VentaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta_detalle
        exclude = ('venta',)

class Venta_DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta_detalle
        exclude = ('venta',)
        depth = 2

class VentaSerializer(WritableNestedModelSerializer):
    detalle_venta = VentaDetalleSerializer(many=True)
    class Meta:
        model = Venta
        fields = ['id', 'cliente', 'estado', 'fecha', 'descuento','total', 'detalle_venta']
    def to_representation(self, instance):
        venta_detalle = Venta_detalle.objects.filter(venta = instance.pk)
        ser_venta_detalle = Venta_DetalleSerializer(venta_detalle, many=True)
        return {
            'id':instance.id,
            'cliente':instance.nombre_cliente if instance.cliente else None,
            'estado': instance.estado,
            'fecha':instance.fecha,
            'descuento': instance.descuento,
            'total':instance.total,
            'detalle_venta':ser_venta_detalle.data
        }

class RemisionDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remision_venta_detalle
        fields = '__all__'


class RemisionesSerializer(WritableNestedModelSerializer):
    remision_venta = RemisionDetalleSerializer(many=True)
    class Meta:
        model = Remision_venta
        fields = ['id', 'compra', 'remision_venta']

class SalidaAlmacen(serializers.ModelSerializer):
    class Meta:
        model = SalidaVenta
        fields = '__all__'
