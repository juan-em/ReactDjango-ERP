from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import *

class PropuestaTecnicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propuesta_tecnica
        fields = "__all__"

class PropuestaEconomicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propuesta_economica
        fields = "__all__"

class OrdenBienSerializer(WritableNestedModelSerializer):
    orden_bien_tecnico = PropuestaTecnicaSerializer(many=True)
    orden_bien_economico = PropuestaEconomicaSerializer(many=True) 

    class Meta:
        model = Orden_bien
        fields = ['id', 'bien_nombre', 'bien_estado', 'orden_bien_tecnico', 'orden_bien_economico', 'bien_cotizacion_archivo']
