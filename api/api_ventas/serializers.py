from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class Venta_DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta_detalle
        fields = '__all__'

class VentaSerializer(WritableNestedModelSerializer):
    venta_detalle = Venta_DetalleSerializer(many=True)
    class Meta:
        model = Venta
        fields = '__all__'
    def to_representation(self, instance):
        cliente = Clientes.objects.get(pk=instance.cliente.pk)
        venta_detalle = Venta_detalle.objects.filter(venta = instance.pk)
        ser_venta_detalle = Venta_DetalleSerializer(venta_detalle, many=True)
        return {
            'id':instance.id,
            'cliente':instance.nombre_cliente if instance.cliente else None,
            'estado': instance.estado,
            'fecha':instance.fecha,
            'descuento': instance.descuento,
            'total':instance.total,
        }

class RemisionDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remision_venta_detalle
        fields = '__all__'


class RemisionesSerializer(WritableNestedModelSerializer):
    remision_venta = Remision_venta_detalle(many=True)
    class Meta:
        model = Remision_venta
        fields = ['id', 'compra', 'remision_venta']

class SalidaAlmacen(serializers.ModelSerializer):
    class Meta:
        model = SalidaVenta
        fields = '__all__'
