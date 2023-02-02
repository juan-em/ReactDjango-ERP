from api_models import models
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *

# Create your views here.

class ProveedoresView(APIView):
    
    def get(self, request):
        dataProveedores = Proveedores.objects.all()
        serProveedores = ProveedoresSerializer(dataProveedores, many=True)
        return Response(serProveedores.data)
    
    def post(self, request):
        serProveedores = ProveedoresSerializer(data=request.data)
        serProveedores.is_valid(raise_exception=True)
        serProveedores.save()
        return Response(serProveedores.data)


class ProveedoresDetailView(APIView):

    def get(self, request, id):
        dataProveedores = Proveedores.objects.get(pk=id)
        serProveedores = ProveedoresSerializer(dataProveedores)
        return Response(serProveedores.data)

    def put(self, request, id):
        dataProveedor = Proveedores.objects.get(pk=id)
        serProveedor = ProveedoresSerializer(dataProveedor, data=request.data)
        serProveedor.is_valid(raise_exception=True)
        serProveedor.save()
        return Response(serProveedor.data)
    
    def patch(self, request, id ):
        dataProveedor = Proveedores.objects.get(pk=id)
        serProveedor = ProveedoresSerializer(dataProveedor, data=request.data,
                                            partial=True)
        serProveedor.is_valid(raise_exception=True)
        serProveedor.save()
        return Response(serProveedor.data)

    
    def delete(self, request, id):
        dataProveedores = Proveedores.objects.get(pk=id)
        serProveedores = ProveedoresSerializer(dataProveedores)
        dataProveedores.delete()
        return Response({'mensaje':'proveedor eliminado'})    
