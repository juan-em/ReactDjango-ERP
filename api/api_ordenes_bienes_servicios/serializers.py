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
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['propuesta_tecnica_documento'] = "http://localhost:8000" + instance.propuesta_tecnica_documento.url if instance.propuesta_tecnica_documento else '#'
        representation['propuesta_economica_documento'] = "http://localhost:8000" + instance.propuesta_economica_documento.url if instance.propuesta_economica_documento else '#'
        representation['bien_cotizacion_documento'] = "http://localhost:8000" + instance.bien_cotizacion_documento.url if instance.bien_cotizacion_documento else '#'
        return representation 

class PropuestaEmpresaBienSerializer(WritableNestedModelSerializer):
    propuesta_documentos_bien = PropuestaEmpresaBienDocumentosSerializer()
    
    class Meta:
        model = Propuesta_Empresa_Bien
        fields = ['id', 'proveedor_id', 'propuesta_documentos_bien']

class OrdenBienSerializer(WritableNestedModelSerializer):
    orden_bien = PropuestaEmpresaBienSerializer(many=True)

    class Meta:
        model = Orden_bien
        fields = ['id', 'bien_nombre', 'bien_estado', 'orden_bien','codigo']