from django.db import models
from api_models.models import Areas, Almacen

# Create your models here.
class Requerimiento_Bien(models.Model):
    nombre_persona_requerimiento = models.CharField(max_length=50, null=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()
    area_solicitante = models.ForeignKey(Areas, on_delete=models.CASCADE)
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    fecha_registro = models.DateField(auto_now_add=True, null=True)
    hora_registro = models.TimeField(auto_now_add=True, null=True)
    fecha_modificacion = models.DateField(auto_now=True, null=True)
    hora_modificacion = models.TimeField(auto_now=True, null=True)


class Requerimiento_Servicio(models.Model):
    nombre_persona_requerimiento = models.CharField(max_length=50, null=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()
    area_solicitante = models.ForeignKey(Areas, on_delete=models.CASCADE)
    fecha_registro = models.DateField(auto_now_add=True, null=True)
    hora_registro = models.TimeField(auto_now_add=True, null=True)
    fecha_modificacion = models.DateField(auto_now=True, null=True)
    hora_modificacion = models.TimeField(auto_now=True, null=True)