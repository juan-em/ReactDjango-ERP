from django.db import models

from api_models.models import Proveedores

# Create your models here.
NINGUNO = "Ninguno"

SERVICIO = "Servicio"
BIEN = "Bien"

SOLICITANDO_COTIZACION = "Solicitando cotización"
APROBADO = "Aprobado"
EN_PROGRESO = "En progreso"
DENEGADO = "Denegado"

ESTADO_SOLICITUD = [
    (NINGUNO, "Ninguno"),
    (SOLICITANDO_COTIZACION, "Solicitando cotización"),
    (APROBADO, "Aprobado"),
    (EN_PROGRESO, "En progreso"),
    (DENEGADO, "Denegado")
]

# class Orden_bien(models.Model):
#     bien_nombre = models.CharField(max_length=500)
#     bien_estado = models.CharField(max_length=50, choices=ESTADO_SOLICITUD, default=NINGUNO)

#     def __str__(self):
#         return self.bien_nombre

# class Propuesta_Empresa_Bien(models.Model):
#     proveedor_id = models.ForeignKey(Proveedores, on_delete=models.CASCADE, null=True)
#     propuesta_bien = models.ForeignKey(Orden_bien, related_name="orden_bien", on_delete=models.CASCADE, null=True)
#     fecha_registro = models.DateField(auto_now_add=True)
#     fecha_ultima_modificacion = models.DateField(auto_now=True)

# class Propuesta_Empresa_Bien_Documentos(models.Model):
#     propuesta_empresa = models.ForeignKey(Propuesta_Empresa_Bien, related_name="propuesta_documentos_bien", on_delete=models.CASCADE, null=True)
#     propuesta_tecnica_documento = models.FileField(upload_to="documents/propuesta_tecnica", blank=True, null=True)
#     propuesta_economica_documento = models.FileField(upload_to="documents/propuesta_economica", blank=True, null=True)
#     bien_cotizacion_documento = models.FileField(upload_to="documents/cotizacion", blank=True, null=True)
#     fecha_registro = models.DateField(auto_now_add=True)
#     fecha_ultima_modificacion = models.DateField(auto_now=True)

class Propuesta_Empresa_Bien_Documentos(models.Model):
    propuesta_tecnica_documento = models.FileField(upload_to="documents/propuesta_tecnica", blank=True, null=True)
    propuesta_economica_documento = models.FileField(upload_to="documents/propuesta_economica", blank=True, null=True)
    bien_cotizacion_documento = models.FileField(upload_to="documents/cotizacion", blank=True, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

class Orden_bien(models.Model):
    bien_nombre = models.CharField(max_length=500)
    bien_estado = models.CharField(max_length=50, choices=ESTADO_SOLICITUD, default=NINGUNO)

    @property
    def codigo(self):
        pk = str(self.pk)
        return "OB-"+"0"*(5-len(pk))+pk


class Propuesta_Empresa_Bien(models.Model):
    proveedor_id = models.ForeignKey(Proveedores, on_delete=models.CASCADE, null=True)
    orden_bien = models.ForeignKey(Orden_bien, related_name="orden_bien", on_delete=models.CASCADE, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)
    propuesta_documentos_bien = models.OneToOneField(Propuesta_Empresa_Bien_Documentos, on_delete=models.CASCADE)
