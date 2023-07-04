# Generated by Django 4.1.5 on 2023-07-04 02:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api_models', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orden_bien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bien_nombre', models.CharField(max_length=500)),
                ('bien_estado', models.CharField(choices=[('Ninguno', 'Ninguno'), ('Solicitando cotización', 'Solicitando cotización'), ('Aprobado', 'Aprobado'), ('En progreso', 'En progreso'), ('Denegado', 'Denegado')], default='Ninguno', max_length=50)),
                ('mayor_500', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Orden_servicio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('servicio_nombre', models.CharField(max_length=500)),
                ('servicio_estado', models.CharField(choices=[('Ninguno', 'Ninguno'), ('Solicitando cotización', 'Solicitando cotización'), ('Aprobado', 'Aprobado'), ('En progreso', 'En progreso'), ('Denegado', 'Denegado')], default='Ninguno', max_length=50)),
                ('mayor_500', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta_Empresa_Bien_Documentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propuesta_tecnica_documento', models.FileField(blank=True, null=True, upload_to='documents/bienes/propuesta_tecnica')),
                ('propuesta_economica_documento', models.FileField(blank=True, null=True, upload_to='documents/bienes/propuesta_economica')),
                ('bien_cotizacion_documento', models.FileField(blank=True, null=True, upload_to='documents/bienes/cotizacion')),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta_Empresa_Servicio_Documentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propuesta_tecnica_documento', models.FileField(blank=True, null=True, upload_to='documents/servicios/propuesta_tecnica')),
                ('propuesta_economica_documento', models.FileField(blank=True, null=True, upload_to='documents/servicios/propuesta_economica')),
                ('servicio_cotizacion_documento', models.FileField(blank=True, null=True, upload_to='documents/servicios/cotizacion')),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta_Empresa_Servicio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('empresa_servicio', models.CharField(max_length=250, null=True)),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
                ('orden_servicio', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orden_servicio', to='api_ordenes_bienes_servicios.orden_servicio')),
                ('propuesta_documentos_servicio', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api_ordenes_bienes_servicios.propuesta_empresa_servicio_documentos')),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta_Empresa_Bien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
                ('orden_bien', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orden_bien', to='api_ordenes_bienes_servicios.orden_bien')),
                ('propuesta_documentos_bien', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api_ordenes_bienes_servicios.propuesta_empresa_bien_documentos')),
                ('proveedor_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api_models.proveedores')),
            ],
        ),
    ]
