from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import * 
from .models import *

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import QueryDict
import re
from django.core.files.uploadedfile import TemporaryUploadedFile

from django.http.request import QueryDict

import json

def querydict_to_dict_v2(qd):
    """
    Convierte un QueryDict en un diccionario anidado.
    """
    def get_value(value):
        try:
            return int(value)
        except (TypeError, ValueError):
            return value

    data = {}
    for main_key, main_value in qd.lists():
        parts = main_key.split('[')
        main_key = parts[0]
        idx = None
        if len(parts) > 1:
            idx = int(parts[1][:-1])

        if main_key not in data:
            data[main_key] = [] if idx is not None else get_value(main_value[0])
        if idx is not None:
            while len(data[main_key]) <= idx:
                data[main_key].append({})
            sub_key = parts[2][:-1]
            data[main_key][-1][sub_key] = get_value(main_value[0])
    return data







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
        print(request.data)
        print(querydict_to_dict_v2(request.data))
        # try:
        #     serializer = OrdenBienSerializer(data=querydict_to_dict_v2(request.data))
        #     serializer.is_valid(raise_exception=True)
        #     serializer.save()

        #     context = {
        #             'data':'OK',
        #             'status':status.HTTP_201_CREATED,
        #             'content':serializer.data
        #     }
            
        #     return Response(context)
        # except Exception as Error:
        #     print(Error)
            
        #     return Response({
        #         'status': False,
        #         'content': 'Error',
        #         'message': 'Internal server error'
        #     })
        
        return Response({'ohola':'hola'})
