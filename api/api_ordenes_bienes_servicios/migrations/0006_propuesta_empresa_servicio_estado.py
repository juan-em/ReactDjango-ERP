# Generated by Django 4.1.5 on 2023-07-24 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_ordenes_bienes_servicios', '0005_remove_propuesta_empresa_bien_documentos_estado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='propuesta_empresa_servicio',
            name='estado',
            field=models.BooleanField(default=False),
        ),
    ]
