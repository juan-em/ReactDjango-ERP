from rest_framework import serializers

from api_models.models import Persona, Empresa, Trabajador

class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = ['id', 'persona', 'tipo_trabajador','area', 'borrado']
