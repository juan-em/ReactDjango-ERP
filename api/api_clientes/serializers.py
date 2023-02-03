from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer

#Import models
from api_models.models import (
    Clientes, Persona, Empresa
)

class ClientePersonaSerilizer(WritableNestedModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','persona','codformapago','borrado']
    


class ClienteEmpresaSerilizer(WritableNestedModelSerializer):
    empresa = EmpresaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','empresa','codformapago','borrado'] 
 

        