# Generated by Django 4.1.5 on 2023-07-23 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_ordenes_bienes_servicios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='propuesta_empresa_bien_documentos',
            name='estado',
            field=models.BooleanField(default=False),
        ),
    ]
