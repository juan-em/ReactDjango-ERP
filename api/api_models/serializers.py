from .models import *
from rest_framework import serializers


class PersonaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Persona
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['codprovincia'] = instance.codprovincia.nombreprovincia
        return representation  

class EmpresaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Empresa
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['codprovincia'] = instance.codprovincia.nombreprovincia
        return representation  