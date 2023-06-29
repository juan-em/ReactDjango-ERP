from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from . models import *

class CajaDiariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja_Diaria
        fields = ['id', 'responsable_apertura', 'monto_inicial', 'monto_final', 'monto_actual', 'estado_caja', 'responsable_cierre']
        read_only_fields = ('fecha_apertura', 'hora_apertura', 'fecha_cierre', 'hora_cierre')

class IngresosVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingreso_Venta
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    
    def to_representation(self, instance):
        fields = super().to_representation(instance)

        fields["monto"] = instance.venta.total
        fields["codigo"] = instance.venta.codigo

        return fields

class EgresosCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egresos_Compra
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    
    def to_representation(self, instance):
        fields = super().to_representation(instance)

        fields["monto"] = instance.compra.totalCompra
        fields["codigo"] = instance.compra.codigo

        return fields

class IngresosOtrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingresos_Otros
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)

class EgresosOtrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egresos_Otros
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)

class IngresosSesionVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingreso_Sesion_Venta
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)

class RegistrosCajaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Caja_Diaria
        fields = ['id', 'responsable_apertura', 'monto_inicial', 'monto_final', 'monto_actual', 'estado_caja', 'responsable_cierre']
        read_only_fields = ('fecha', 'hora',)
    
    def to_representation(self, instance):
        caja = super().to_representation(instance)

        registros_caja = IngresosVentaSerializer(instance.ingresos_venta, many=True).data + IngresosSesionVentaSerializer(instance.ingresos_sesion_venta, many=True).data + IngresosOtrosSerializer(instance.ingresos_otros, many=True).data + EgresosCompraSerializer(instance.egresos_compra, many=True).data + EgresosOtrosSerializer(instance.egresos_otros, many=True).data

        caja["registros_caja"] = registros_caja

        return caja