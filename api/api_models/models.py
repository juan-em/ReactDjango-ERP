from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from cloudinary.models import CloudinaryField


#CHOICES
CHOICES_YES_NO = (("Sí", "Sí"),
    ("No", "No"))

CHOICES_PRIM_INS = [
    ("Materia Prima", "Materia Prima"),
    ("Insumo", "Insumo"),
    ("Ninguno", "Ninguno")
]

# MODELOS
class Provincias(models.Model):
    nombreprovincia = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombreprovincia

class Formapago(models.Model):
    nombrefp = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombrefp

class Entidades(models.Model):
    nombreentidad = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombreentidad

class Almacen(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

class Impuestos(models.Model):
    nombre = models.CharField(max_length=100)
    valor = models.FloatField(validators=[MinValueValidator(0.0)])
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

class Embalajes(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

#####################
#MODELOS GENERALES PERSONA Y EMPRESA

class Persona(models.Model):
    nombre = models.CharField(max_length=100, default="-")
    dni = models.CharField(max_length=100, default="-")
    codprovincia = models.ForeignKey(Provincias, on_delete=models.CASCADE)
    localidad = models.CharField(max_length=100, default="-")
    direccion = models.CharField(max_length=500, default="-")
    codpostal = models.CharField(max_length=100, default="-")
    cuentabancaria = models.CharField(max_length=100, default="-")
    telefono = models.CharField(max_length=100, default="-")
    movil = models.CharField(max_length=100, default="-")
    web = models.CharField(max_length=100, default="-")
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.nombre

class Empresa(models.Model):
    nombre = models.CharField(max_length=100, default="-")
    ruc = models.CharField(max_length=100, default="-")
    estructurajuridica = models.CharField(max_length=100, default="-")
    tipo = models.CharField(max_length=100, default="-")
    codprovincia = models.ForeignKey(Provincias, on_delete=models.CASCADE)
    localidad = models.CharField(max_length=100, default="-")
    direccion = models.CharField(max_length=500, default="-")
    codpostal = models.CharField(max_length=100, default="-")
    cuentabancaria = models.CharField(max_length=100, default="-")
    telefono = models.CharField(max_length=100, default="-")
    movil = models.CharField(max_length=100, default="-")
    web = models.CharField(max_length=100, default="-")
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.nombre

###################
#CLIENTES

class Clientes(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    codformapago = models.ForeignKey(Formapago, on_delete=models.CASCADE)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        if self.persona:
            return f'{self.persona.nombre}'
        else:
            return f'{self.empresa.nombre}'

    @property
    def codigo(self):
        id = str(self.pk)
        return 'CLIE-'+'0'*(5-len(id))+id

##################
#PROVEEDORES

class Proveedores(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    ruc = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        if self.persona:
            return f'{self.persona.nombre}'
        else:
            return f'{self.empresa.nombre}'
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'PROV-'+'0'*(5-len(id))+id

###############
#CATEGORIA DE ARTICULO

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

################
#ARTICULO

class Articulos(models.Model):
    nombre = models.CharField(max_length=20)
    categoria = models.ForeignKey(Categoria,on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=5000)
    impuesto = models.ForeignKey(Impuestos, on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    ubicacion = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)
    stock_minimo = models.PositiveIntegerField(default=0)
    aviso_minimo = models.CharField(max_length=3,choices=CHOICES_YES_NO)
    fecha_alta = models.DateField()
    embalaje = models.ForeignKey(Embalajes, on_delete=models.CASCADE)
    unidades_por_caja = models.PositiveIntegerField(default=0)
    observaciones = models.CharField(max_length=500)
    # Precio al que se compre
    precio_compra = models.FloatField(validators=[MinValueValidator(0.0)])
    # Precio al que se vende (igv)
    precio_venta = models.FloatField(validators=[MinValueValidator(0.0)])
    # Precio del producto sin descuentos ni impuestos
    precio_bruto = models.FloatField(validators=[MinValueValidator(0.0)])
    imagen = CloudinaryField('imagen', null=True, blank=True, default='https://res.cloudinary.com/dm8aqmori/image/upload/v1675259440/erp/Blancos_aoyyl7.png')
    # Insumo o Materia Prima
    tipo = models.CharField(max_length=50, choices=CHOICES_PRIM_INS, default="Ninguno") 
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre


#################
#PRODUCTO

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    cantidad = models.IntegerField(default=0)
    descripcion_producto = models.TextField(null=True, blank=True)
    precio_final = models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    color=models.TextField(null=True, blank=True)
    talla=models.TextField(null=True, blank=True)
    precio_horas_manufactura=models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    horas_manufactura=models.IntegerField(default=0)
    costos_extra=models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    precio_inicial=models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

class Producto_detalle(models.Model):
    producto = models.ForeignKey(Producto,related_name='producto_detalle', on_delete=models.CASCADE, null=True)
    articulo = models.ForeignKey(Articulos, on_delete=models.CASCADE, null=True)
    cantidad = models.IntegerField(default=0)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.articulo.nombre

################
#FACTURA

class Factura(models.Model):
    fecha = models.DateField(null=True)
    iva = models.IntegerField()
    totalfactura = models.FloatField(default=0, null=True) 

###############
# VENTA

class Venta_clie(models.Model):
    factura = models.OneToOneField(Factura, on_delete=models.CASCADE, primary_key=True)
    codcliente = models.ForeignKey(Clientes, on_delete=models.CASCADE)
    estadoprod = models.BooleanField(null=True, default=False)
    contador_productos = models.IntegerField(null=True, default=0)

    def __str__(self):
        if self.codcliente.persona:
            return "Nombre cliente: {}, Cod. Factura:{}".format(self.codcliente.persona.nombre, self.factura.pk)    
        else:
            return "Nombre cliente: {}, Cod. Factura:{}".format(self.codcliente.empresa.nombre, self.factura.pk)

class Venta_clie_detalle(models.Model):
    venta_clie = models.ForeignKey(Venta_clie, on_delete=models.CASCADE, null=True)
    codproducto = models.ForeignKey(Producto, on_delete=models.CASCADE, null=True)
    cantidad = models.IntegerField()
    precio = models.FloatField()
    importe = models.FloatField(null=True)
    dsctoproducto = models.FloatField()
    remision_hecha = models.BooleanField(null=True, blank=True, default=False)

    def __str__(self):
        return "Nombre articulo: {}".format(self.codproducto.nombre)

##############
#COMPRA
    
class Compra_prov(models.Model):
    compra = models.OneToOneField(Factura, on_delete=models.CASCADE, primary_key=True)
    codprov = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    imagen_fac_compra = CloudinaryField('imagen_fac_compra', null=True, blank=True, default='https://res.cloudinary.com/dm8aqmori/image/upload/v1675259440/erp/Blancos_aoyyl7.png')
    estado = models.BooleanField(null=True, blank=True, default=False)
    detaller_entrega = models.TextField(null=True, blank=True)
    def __str__(self):
        if self.codprov.persona:
            return "Nombre Proveedor: {}, Orden de compra: {}".format(self.codprov.persona.nombre, self.compra.pk)    
        else:
            return "Nombre Proveedor: {}, Orden de compra: {}".format(self.codprov.empresa.nombre, self.compra.pk)

class Compra_prov_detalle(models.Model):
    compra_prov = models.ForeignKey(Compra_prov, on_delete=models.CASCADE, null=True)
    codproducto = models.ForeignKey(Articulos, on_delete=models.CASCADE, null=True)
    cantidad = models.IntegerField()
    precio = models.FloatField()
    importe = models.FloatField(null=True)
    dsctoproducto = models.FloatField(null=True, default=0, blank=True)
    remision_hecha = models.BooleanField(null=True, blank=True, default=False)
    
    def __str__(self):
        return "Nombre articulo:{}".format(self.codproducto.nombre)


########################
#REMISION DE VENTAS
class Remision_venta(models.Model):
    NOENVIADO = 'No Enviado'
    ENVIADO = 'Enviado'
    

    ESTADOREM = [
        (NOENVIADO, 'No Enviado'),
        (ENVIADO, 'Enviado'),
    ]
    factura_venta_clie = models.ForeignKey(Venta_clie, on_delete=models.CASCADE)
    fecha_remision = models.DateField(auto_now_add=True)
    contador = models.IntegerField(default=0, null=True)
    estado = models.CharField(max_length=100, choices=ESTADOREM, default=NOENVIADO)

    def __str__(self):
        return "Numero de factura:{}".format(self.factura_cliente.factura.pk)

class Remision_venta_detalle(models.Model):
    codremision = models.ForeignKey(Remision_venta, on_delete=models.CASCADE)
    codproducto = models.ForeignKey(Venta_clie_detalle, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "Numero de remisión:{}".format(self.codremision.pk)

########################
#REMISION DE COMPRAS
class Remision_compra(models.Model):
    factura_proveedor = models.ForeignKey(Compra_prov, on_delete=models.CASCADE)

    def __str__(self):
        return "Numero de linea:{}".format(self.factura_proveedor)

class Remision_linea_prov(models.Model):
    codremision = models.ForeignKey(Remision_compra, on_delete=models.CASCADE)
    codproducto = models.ForeignKey(Compra_prov_detalle, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "Numero de remisión:{}".format(self.codremision.pk)



#######################
# TESORERIA
class Caja_diaria(models.Model):
    fecha_apertura = models.DateTimeField(null=True, auto_now_add=True)
    fecha_cierre = models.DateTimeField(null=True, auto_now_add=True)
    monto_total_inicial = models.FloatField(null=True, default=0)
    monto_total_final = models.FloatField(null=True, default=0)
    total_ventas = models.FloatField(null=True, default=0)
    total_compras = models.FloatField(null=True, default=0)
    estado = models.BooleanField(default=False)

    def __str__(self):
        return "Monto inicial:{}, Monto final:{}, Estado:{}".format(self.monto_total_inicial, self.monto_total_final, self.estado)

class Caja_tipo_pago(models.Model):
    venta = models.ForeignKey(Venta_clie, on_delete=models.CASCADE, null=True, blank=True)
    compra = models.ForeignKey(Compra_prov, on_delete=models.CASCADE, null=True, blank=True)
    tipo_pago = models.ForeignKey(Formapago, on_delete=models.CASCADE, null=True)
    caja_diaria = models.ForeignKey(Caja_diaria, on_delete=models.CASCADE, null=True)
    total_tipo_pago = models.FloatField(null=True)

###############
#LIBRO DIARIO
class Libro_diario(models.Model):
    COMPRA = 'Compra'
    VENTA = 'Venta'
    NINGUNO = 'Ninguno'

    TIPOS = [
        (COMPRA, 'Compra'),
        (VENTA, 'Venta'),
        (NINGUNO, 'Ninguno')
    ]

    obtener_factura = models.ForeignKey(Factura, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=TIPOS, default=NINGUNO)

    def __str__(self):
        return "Factura:{}, Tipo:{}".format(self.factura.id, self.tipo)

#################
#TRABAJADOR
class Trabajador(models.Model):
    INTERNO = 'Interno'
    CONTRATISTA = 'Contratista'
    NINGUNO = 'Ninguno'

    TIPOS = [
        (INTERNO, 'Interno'),
        (CONTRATISTA, 'Contratista'),
        (NINGUNO, 'Ninguno')
    ]

    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    tipo_trabajador = models.CharField(max_length=30, choices=TIPOS, default=NINGUNO)
    borrado = models.CharField(max_length=1, default=0)

    def __str__(self):
        if self.persona:
            return "Nombre trabajador:{}, Tipo:{}".format(self.persona.nombre, self.tipo_trabajador)    
        else:
            return "Nombre trabajador:{}, Tipo:{}".format(self.empresa.nombre, self.tipo_trabajador)


#######################
# SERVICIOS
#"contratista" en Servicios es la empresa o persona al que se va a pedir el servicio 
class Servicios(models.Model):
    nombre = models.CharField(max_length=200)
    contratista = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    descripcion = models.TextField()
    precio = models.FloatField()

    def __str__(self):
        if self.contratista.persona:
            return "Servicio:{}, Trabajador:{}".format(self.nombre, self.contratista.persona.nombre)
        else:
            return "Servicio:{}, Trabajador:{}".format(self.nombre, self.contratista.empresa.nombre)

#Orden de compra para el servicio
##"trabajador" es la persona de logistica que va a realizar el pedido 
class Orden_compra_servicio(models.Model):
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    fecha_orden_servicio = models.DateTimeField()

    def __str__(self):
        if self.trabajador.persona:
            return "Trabajador:{}".format(self.trabajador.persona.nombre)
        else:
            return "Trabajador:{}".format(self.trabajador.empresa.nombre)

#Servicio(s) dentro de la orden de compra
class Servicio_compra(models.Model):
    servicio = models.ForeignKey(Servicios, on_delete=models.CASCADE)
    orden_compra = models.ForeignKey(Orden_compra_servicio, on_delete=models.CASCADE, null=True)
    fecha_compra = models.DateField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    precio_compra = models.FloatField(null=True)

#Comprobante que muestra el total de servicios 
class Recibir_orden_servicio(models.Model):
    orden_compra_referencia = models.OneToOneField(Orden_compra_servicio, on_delete=models.CASCADE, null=True)
    fecha_pedido = models.DateTimeField()
    costo_total = models.FloatField()
    
    def __str__(self):
        return "Orden de compra:{}".format(self.servicio_compra_referencia)

##################
# PRODUCCION
class Produccion(models.Model):

    NINGUNO = 'No Iniciado'
    PROCESO = 'En proceso'
    TERMINADO = 'Terminado'
    SALIENDO = 'Saliendo'

    PROCESOSPROD = [
        (NINGUNO, 'No Iniciado'),
        (PROCESO, 'En proceso'),
        (TERMINADO, 'Terminado'),
        (SALIENDO, 'Saliendo')
    ]

    factura_clie = models.ForeignKey(Venta_clie, on_delete=models.CASCADE, null=True)
    fecha_inicio = models.DateField(auto_now_add=True)
    fecha_fin = models.DateField()
    estdo_produccion = models.CharField(max_length=100, choices=PROCESOSPROD, default=NINGUNO)

    def __str__(self):
        return str(self.factura_clie)

class Produccion_detalle(models.Model):

    NINGUNO = 'No Iniciado'
    PROCESO = 'En proceso'
    TERMINADO = 'Terminado'
    SALIENDO = 'Saliendo'

    PROCESOSPROD = [
        (NINGUNO, 'No Iniciado'),
        (PROCESO, 'En proceso'),
        (TERMINADO, 'Terminado'),
        (SALIENDO, 'Saliendo')
    ]

    produccion = models.ForeignKey(Produccion, on_delete=models.CASCADE, null=True)
    cod_producto = models.ForeignKey(Venta_clie_detalle, on_delete=models.CASCADE, null=True)
    estdo_produccion_prod = models.CharField(max_length=100, choices=PROCESOSPROD, default=NINGUNO)