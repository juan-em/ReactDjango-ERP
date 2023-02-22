from django.shortcuts import render

from .serializers import *
from api_models.models import *


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class ArticulosView(APIView):
    def get(self, request):
        dataArticulo = Articulo.objects.filter(borrado=False)
        serializer = ArticuloSerializer(dataArticulo, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def post (self, request):
        serializer = ArticuloSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class ArticuloDetailView(APIView):
    def get(self, request, id):
        dataArticulo = Articulo.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def patch (self, request, id):
        data = Articulo.objects.filter(borrado=False).get(id=id)
        serializer = ArticuloSerializer(data, data= request.data,
                                              partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':True,
                'content':serializer.data,
                'status':status.HTTP_202_ACCEPTED
            }
        else:
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
        return Response(context)
    
    def delete(self, request, id):
        data = data = Articulo.objects.filter(borrado=False).get(id=id)
        serializer = ArticuloSerializer(data)
        data.delelte()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context) 


class ArticuloVarianteView(APIView):

    def get(self, request):
        data = ArticuloVariante.objects.all()
        serializer = ArticuloVarianteSerializer(data, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)
    
    def post(self, request):
        serializer = ArticuloVarianteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class ArticuloVarianteDetailView(APIView):
    def patch (self, request, id):
        data = ArticuloVariante.objects.get(id=id)
        serializer = ArticuloVarianteSerializer(data, data= request.data,
                                              partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':True,
                'content':serializer.data,
                'status':status.HTTP_202_ACCEPTED
            }
        else:
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
        return Response(context)
    
    def delete(self, request, id):
        data = ArticuloVariante.objects.get(id=id)
        articulo_id = data.articulo.pk
        isOne = ArticuloVariante.objects.filter(articulo=articulo_id)
        if len(isOne)<2:
            context = {
                'status':False,
                'message':'There has to be always ONE variante',
            }
            return Response(context)
        serializer = ArticuloVarianteSerializer(data)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context) 