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

class EgresosCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egresos_Compra
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)

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