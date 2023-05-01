from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import * 
from .models import *

def get_value(value):
    if isinstance(value, (str, int, float)):
        try:
            return int(value)
        except ValueError:
            pass
        try:
            return float(value)
        except ValueError:
            pass
    return value

def add_to_dict(d, keys, value):
    if len(keys) == 1:
        d[keys[0]] = value
    else:
        key = keys[0]
        if key not in d:
            if keys[1].isdigit():
                d[key] = []
            else:
                d[key] = {}
        if keys[1].isdigit():
            index = int(keys[1])
            if len(d[key]) <= index:
                d[key] += [{}] * (index + 1 - len(d[key]))
            add_to_dict(d[key][index], keys[2:], value)
        else:
            add_to_dict(d[key], keys[1:], value)


def querydict_to_dict(query_dict):
    d = {}
    keys = []
    for key, value in query_dict.items():
        if '[' in key:
            var_attr = key.split('[')
            newKeys = []
            for i in var_attr:
                i = i.replace("]", "")
                newKeys.append(i)
            del var_attr
            add_to_dict(d, newKeys, get_value(value))
        else:
            d[key] = get_value(value)
    return d


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
        print(querydict_to_dict(request.data))

        try:
            serializer = OrdenBienSerializer(data=querydict_to_dict(request.data))
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
            print(serializer.data)
            
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            })