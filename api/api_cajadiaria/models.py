from django.db import models
from api_models.models import User, Venta, Compra
from django.dispatch import receiver
from django.db.models.signals import pre_save

# Create your models here.
class Caja_Diaria (models.Model):
    fecha_apertura = models.DateField(auto_now_add=True)
    hora_apertura = models.TimeField(auto_now_add=True)
    monto_inicial = models.FloatField()
    responsable_apertura = models.ForeignKey(User, related_name="responsable_apertura", on_delete=models.SET_NULL, null=True)
    fecha_cierre = models.DateField(null=True)
    hora_cierre = models.TimeField(null=True)
    monto_final = models.FloatField(null=True)
    estado_caja = models.BooleanField(default=False, blank=True)
    responsable_cierre = models.ForeignKey(User, related_name="responsable_cierre", on_delete=models.SET_NULL, null=True)

class Registros_Caja (models.Model):
    VENTAS = "Ventas"
    COMPRAS = "Compras"
    INGRESOS_OTROS = "Otros ingresos"
    EGRESOS_OTROS = "Otros egresos"

    TIPO_REGISTRO = [
        (VENTAS, "Ventas"),
        (COMPRAS, "Compras"),
        (INGRESOS_OTROS, "Otros ingresos"),
        (EGRESOS_OTROS, "Otros egresos"),
    ]
    
    caja = models.ForeignKey(Caja_Diaria, on_delete=models.CASCADE)
    responsable = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now=True)
    hora = models.TimeField(auto_now=True)
    tipo = models.CharField(max_length=250, choices=TIPO_REGISTRO)

    # Posible modificacion: dejar el property de monto en las 4 tablas

DOLARES = "Dolares"
SOLES = "Soles"

TIPO_PAGO = [
    (DOLARES, "Dolares"),
    (SOLES, "Soles"),
]

class Ingresos_Otros (Registros_Caja):
    descripcion = models.TextField()
    documento = models.FileField(upload_to="documents/caja_diaria/ingresos_otros", blank=True, null=True)
    tipo_pago = models.CharField(max_length=50, choices=TIPO_PAGO)
    monto = models.FloatField()

class Egresos_Otros (Registros_Caja):
    descripcion = models.TextField()
    documento = models.FileField(upload_to="documents/caja_diaria/egresos_otros", blank=True, null=True)
    tipo_pago = models.CharField(max_length=50, choices=TIPO_PAGO)
    monto = models.FloatField()

class Ingreso_Venta (Registros_Caja):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)

class Egresos_Compra (Registros_Caja):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)