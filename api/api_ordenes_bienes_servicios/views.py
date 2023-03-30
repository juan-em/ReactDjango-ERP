from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import * 
from .models import *

# Create your views here.
class OrdenBienView(APIView):
    def get(self, request):
        orden_bien = Orden_bien.objects.all()
        serializer = OrdenBienSerializer(orden_bien, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        try:
            serializer = OrdenBienSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            context = {
                    'data':'OK',
                    'status':status.HTTP_201_CREATED,
                    'content':serializer.data
            }
            
            return Response(context)
        except Exception as Error:
            print(Error)
            
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            })
