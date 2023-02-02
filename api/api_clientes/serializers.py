from rest_framework import serializers

from django.contrib.auth.models import User

#Import models
from api_models.models import (
    Persona, Empresa, Clientes, Provincias, Formapago, Entidades
)

class PersonaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

class EmpresaSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class ClientePersonaSerilizer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','persona','codformapago','borrado']
    def create(self, validate_data):
        persona_data = validate_data.pop('persona')
        persona = Persona.objects.create(**persona_data)
        cliente =  Clientes.objects.create(persona=persona, **validate_data)
        return cliente

class ClienteEmpresaSerilizer(serializers.ModelSerializer):
    empresa = EmpresaSerilizer()
    class Meta:
        model = Clientes
        fields = ['id','empresa','codformapago','borrado']
    def create(self, validate_data):
        empresa_data = validate_data.pop('persona')
        empresa = Empresa.objects.create(**empresa_data)
        cliente =  Clientes.objects.create(empresa=empresa, **validate_data)
        return cliente

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
