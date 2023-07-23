from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import *

class RequerimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requerimiento
        fields = "__all__"
        read_only_fields = ("fecha_registro", "hora_registro", "fecha_modificacion", "hora_modificacion",)

# class RequerimientoServicioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Requerimiento_Servicio
#         fields = "__all__"
#         read_only_fields = ("fecha_registro", "hora_registro", "fecha_modificacion", "hora_modificacion",)