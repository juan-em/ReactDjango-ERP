from rest_framework import serializers

from django.contrib.auth.models import User

#Import models
from api_models.models import (
    Persona,Empresa
)

class PersonaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

class EmpresaSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'