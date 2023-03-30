from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *
from api_clientes.serializers import ClienteEmpresaSerilizer, ClientePersonaSerilizer

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

class DetallePuntoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_punto_venta
        exclude = ('punto_venta',)

class Detalle_PuntoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_punto_venta
        depth = 2
        exclude = ('punto_venta',)

class PuntoVentaSerializer(WritableNestedModelSerializer):
    detalle_punto_venta = DetallePuntoVentaSerializer(many=True)
    class Meta:
        model = Punto_venta
        fields = ['fecha', 'precio_total', 'cliente', 'detalle_punto_venta']
    def to_representation(self, instance):
        punto_venta_detalle = Detalle_punto_venta.objects.filter(punto_venta = instance.id)
        ser_punto_venta_detalle = Detalle_PuntoVentaSerializer(punto_venta_detalle, many=True)
        return {
            'id': instance.id,
            'fecha':instance.fecha,
            'precio_total':instance.precio_total,
            'cliente':instance.nombre_cliente if instance.cliente else None,
            # 'cliente_nombre':instance.nombre_cliente if instance.cliente else None,
            'detalle_punto_venta': ser_punto_venta_detalle.data
        }

# class PVSerializer(WritableNestedModelSerializer):
#     detalle_punto_venta = DetallePuntoVentaSerializer(many=True)
#     class Meta:
#         model = Punto_venta
#         fields=['fecha', 'precio_total', 'cliente', 'detalle_punto_venta']

class SesionVentaSerializer(WritableNestedModelSerializer):
    punto_venta = PuntoVentaSerializer(many=True)
    class Meta:
        model = Sesion_venta
        fields = ['fecha', 'monto_inicial', 'responsable', 'hora_fin', 'monto_final', 'punto_venta']
    def to_representation(self, instance):
        punto_venta = Punto_venta.objects.filter(sesion_venta = instance.id)
        ser_punto_venta = PuntoVentaSerializer(punto_venta, many=True)
        print(ser_punto_venta.data)
        return {
            'id':instance.id,
            'fecha':instance.fecha,
            'monto_inicial':instance.monto_inicial,
            'responsable':instance.responsable,
            'hora_fin':instance.hora_fin,
            'monto_final':instance.monto_inicial,
            'punto_venta': ser_punto_venta.data
        }
