from . serializers import *
from . models import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RequerimientoBienView(APIView):
    def get(self, request):
        data = Requerimiento_Bien.objects.all()
        serializer = RequerimientoBienSerializer(data, many=True)

        context = {
            'status': True,
            'content':serializer.data
        }

        return Response(context)

    def post(self, request):
        serializer = RequerimientoBienSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data': 'OK',
            'status': status.HTTP_201_CREATED,
            'content': serializer.data
        }

        return Response(context)

class RequerimientoServicioView(APIView):
    def get(self, request):
        data = Requerimiento_Servicio.objects.all()
        serializer = RequerimientoServicioSerializer(data, many=True)

        context = {
            'status': True,
            'content':serializer.data
        }

        return Response(context)

    def post(self, request):
        serializer = RequerimientoServicioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data': 'OK',
            'status': status.HTTP_201_CREATED,
            'content': serializer.data
        }

        return Response(context)

class RequerimientoBienDetailView(APIView):
    def get(self, request, id):
        dataReqBien = Requerimiento_Bien.objects.get(id=id)
        serializer = RequerimientoBienSerializer(dataReqBien)

        context = {
            'status': True,
            'contenxt': serializer.data
        }

        return Response(context)

    def delete(self, request, id):
        dataReqBien = Requerimiento_Bien.objects.get(id=id)
        dataReqBien.delete()

        context = {
            'status':True,
            'message':'Delete success',
        }
        
        return Response(context)

class RequerimientoServicioDetailView(APIView):
    def get(self, request, id):
        dataReqServ = Requerimiento_Servicio.objects.get(id=id)
        serializer = RequerimientoServicioSerializer(dataReqServ)

        context = {
            'status': True,
            'contenxt': serializer.data
        }

        return Response(context)

    def delete(self, request, id):
        dataReqServ = Requerimiento_Servicio.objects.get(id=id)
        dataReqServ.delete()

        context = {
            'status':True,
            'message':'Delete success',
        }
        
        return Response(context)