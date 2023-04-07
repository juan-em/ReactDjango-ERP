from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *
from api_compras.serializers import *
from api_ventas.serializers import *
from api_mantenimientos.serializers import *

class CajaDiariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja_diaria
        fields = '__all__'
    
    def to_representation(self, instance):
        
        return {
            'id': instance.id,
            'codigo': instance.codigo,
            'descripcion': instance.descripcion,
            'fecha_apertura': instance.fecha_apertura,
            'fecha_cierre': instance.fecha_cierre,
            'monto_inicial': instance.monto_inicial,
            'monto_final': instance.monto_final,
            'responsable' : instance.responsable

        }

class CajaDiariaMovimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja_diaria_movimientos
        fields = '__all__'
    
    def to_representation(self, instance):
        venta_info = Venta.objects.get(id=instance.venta.id).id if instance.venta else None
        compra_info = Compra.objects.get(id=instance.compra.id).codigo if instance.compra else None
        tipo_pago_info = FormapagoSerializer(Formapago.objects.get(id=instance.tipo_pago.id)).data if instance.tipo_pago else None
        return {
            'id': instance.id,
            'venta': venta_info ,
            'compra': compra_info,
            'tipo_movimiento': instance.tipo_movimiento,
            'tipo_pago': tipo_pago_info,
            'total_movimiento': instance.total_movimiento
        }