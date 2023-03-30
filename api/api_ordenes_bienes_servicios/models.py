from django.db import models

# Create your models here.
NINGUNO = "Ninguno"

SERVICIO = "Servicio"
BIEN = "Bien"

PROPUESTA_TIPO = [
    (NINGUNO, "Ninguno"),
    (SERVICIO, "Servicio"),
    (BIEN, "Bien")
]

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

class Orden_bien(models.Model):
    bien_nombre = models.CharField(max_length=500)
    bien_estado = models.CharField(max_length=50, choices=ESTADO_SOLICITUD, default=NINGUNO)
    bien_cotizacion = models.FloatField(null=True)

    def __str__(self):
        return self.bien_nombre

class Propuesta_tecnica(models.Model):
    propuesta_tecnica_nombre = models.CharField(max_length=100)
    orden_bien_tecnico = models.ForeignKey(Orden_bien, related_name="orden_bien_tecnico", on_delete=models.CASCADE, null=True)
    propuesta_tecnica_tipo = models.CharField(max_length=50, choices=PROPUESTA_TIPO, default=NINGUNO, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

    def __str__(self):
        return self.propuesta_tecnica_nombre

class Propuesta_economica(models.Model):
    propuesta_economica_nombre = models.CharField(max_length=100)
    orden_bien_economico = models.ForeignKey(Orden_bien, related_name="orden_bien_economico", on_delete=models.CASCADE, null=True)
    propuesta_economica_tipo = models.CharField(max_length=50, choices=PROPUESTA_TIPO, default=NINGUNO, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

    def __str__(self):
        return self.propuesta_economica_nombre
