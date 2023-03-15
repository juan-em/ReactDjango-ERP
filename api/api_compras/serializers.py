from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *

class CompraDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompraDetalle
        exclude = ('compra',)

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'
        depth = 2

class DetalleCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompraDetalle
        #fields = '__all__'
        exclude = ('compra',)
        depth = 2


class CompraSerializer(WritableNestedModelSerializer):
    detalle_compra = CompraDetalleSerializer(many=True)
    class Meta:
        model = Compra
        fields = ['id','fecha', 'proveedor', 'estado', 'detalle_entrega', 'totalCompra', 'imagen_fac_compra', 'descuento', 'detalle_compra']
    
    def to_representation(self,instance):
        detalle_compra = CompraDetalle.objects.filter(compra=instance.pk)
        ser_detalle_compra = DetalleCompraSerializer(detalle_compra, many=True)
        return{
            'id': instance.id,
            #All prov's information -> 'proveedor': ser_prov.data,
            #Just the name of the prov -> 'provedor': instance.nombre_proveedor,
            'provedor': instance.nombre_proveedor if instance.proveedor else None,
            'estado': instance.estado,
            'detalle_entrega': instance.detalle_entrega,
            'totalCompra': instance.totalCompra,
            'imagen_fac_compra': instance.imagen_fac_compra.url,
            'descuento': instance.descuento,
            'detalle_compra': ser_detalle_compra.data
        }


class RemisionDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemisionDetalleCompra
        fields = '__all__'


class RemisionesSerializer(WritableNestedModelSerializer):
    remision_compra = RemisionDetalleSerializer(many=True)
    class Meta:
        model = RemisionCompra
        fields = ['id', 'compra', 'remision_compra']

class EntradaAlmacen(serializers.ModelSerializer):
    class Meta:
        model = EntradaAlmacenCompra
        fields = '__all__'