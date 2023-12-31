# Generated by Django 4.1.5 on 2023-07-24 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_ordenes_bienes_servicios', '0006_remove_propuesta_empresa_bien_documentos_requerimiento_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propuesta_empresa_bien_documentos',
            name='estado',
        ),
        migrations.AddField(
            model_name='propuesta_empresa_bien',
            name='estado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='propuesta_empresa_servicio',
            name='estado',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='orden_bien',
            name='bien_estado',
            field=models.CharField(choices=[('Ninguno', 'Ninguno'), ('Solicitando cotización', 'Solicitando cotización'), ('Aprobado', 'Aprobado'), ('En progreso', 'En progreso'), ('Denegado', 'Denegado'), ('Completado', 'Completado')], default='Ninguno', max_length=50),
        ),
        migrations.AlterField(
            model_name='orden_servicio',
            name='servicio_estado',
            field=models.CharField(choices=[('Ninguno', 'Ninguno'), ('Solicitando cotización', 'Solicitando cotización'), ('Aprobado', 'Aprobado'), ('En progreso', 'En progreso'), ('Denegado', 'Denegado'), ('Completado', 'Completado')], default='Ninguno', max_length=50),
        ),
    ]
