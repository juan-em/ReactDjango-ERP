from rest_framework import serializers

from django.contrib.auth.models import User

#Import models
from api_models.models import (
    Clientes, Provincias, Formapago, Entidades
)

#Import ser
from api_peremp.serializers import PersonaSerializer, EmpresaSerilizer

class ClientePersonaSerilizer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','persona','codformapago']

class ClienteEmpresaSerilizer(serializers.ModelSerializer):
    empresa = EmpresaSerilizer()
    class Meta:
        model = Clientes
        fields = ['empresa', 'codformapago']

class ProvinciasSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Provincias
        fields = '__all__'

class FormapagoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Formapago
        fields = '__all__'


class EntidadesSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Entidades
        fields = '__all__'
