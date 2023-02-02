from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
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

class ClientePersonaSerilizer(WritableNestedModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','persona','codformapago','borrado']
    


class ClienteEmpresaSerilizer(WritableNestedModelSerializer):
    empresa = EmpresaSerilizer()
    class Meta:
        model = Clientes
        fields = ['id','empresa','codformapago','borrado'] 
 

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
