from django.contrib import admin

from .models import *
# Register your models here.


admin.site.register(Provincias)
admin.site.register(Formapago)
admin.site.register(Entidades)
admin.site.register(Clientes)
admin.site.register(Proveedores)
admin.site.register(Persona)
admin.site.register(Articulos)
admin.site.register(Producto)
admin.site.register(Producto_detalle)
admin.site.register(Empresa)
admin.site.register(Categoria)
admin.site.register(Impuestos)
admin.site.register(Almacen)
admin.site.register(Embalajes)
admin.site.register(Factura)
admin.site.register(Venta_clie)
admin.site.register(Venta_clie_detalle)
admin.site.register(Compra_prov)
admin.site.register(Compra_prov_detalle)
admin.site.register(Remision_venta)
admin.site.register(Remision_venta_detalle)
admin.site.register(Caja_diaria)
admin.site.register(Caja_tipo_pago)
admin.site.register(Produccion)
admin.site.register(Produccion_detalle)