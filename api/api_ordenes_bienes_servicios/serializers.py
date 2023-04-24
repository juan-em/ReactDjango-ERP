from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import *

# class PropuestaEmpresaBienDocumentosSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Propuesta_Empresa_Bien_Documentos
#         fields = ['id', 'propuesta_empresa', 'propuesta_tecnica_documento', 'propuesta_economica_documento', 'bien_cotizacion_documento']

# class PropuestaEmpresaBienSerializer(WritableNestedModelSerializer):
#     propuesta_documentos_bien = PropuestaEmpresaBienDocumentosSerializer()
    
#     class Meta:
#         model = Propuesta_Empresa_Bien
#         fields = ['id', 'proveedor_id', 'propuesta_bien', 'propuesta_documentos_bien']

# class OrdenBienSerializer(WritableNestedModelSerializer):
#     orden_bien = PropuestaEmpresaBienSerializer(many=True)

#     class Meta:
#         model = Orden_bien
#         fields = ['id', 'bien_nombre', 'bien_estado', 'orden_bien']

class PropuestaEmpresaBienDocumentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propuesta_Empresa_Bien_Documentos
        fields = ['id', 'propuesta_tecnica_documento', 'propuesta_economica_documento', 'bien_cotizacion_documento']

class PropuestaEmpresaBienSerializer(WritableNestedModelSerializer):
    propuesta_documentos_bien = PropuestaEmpresaBienDocumentosSerializer()
    
    class Meta:
        model = Propuesta_Empresa_Bien
        fields = ['id', 'proveedor_id', 'propuesta_documentos_bien']

class OrdenBienSerializer(WritableNestedModelSerializer):
    orden_bien = PropuestaEmpresaBienSerializer(many=True)

    class Meta:
        model = Orden_bien
        fields = ['id', 'bien_nombre', 'bien_estado', 'orden_bien']