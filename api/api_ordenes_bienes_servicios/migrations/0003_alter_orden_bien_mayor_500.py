# Generated by Django 4.1.5 on 2023-05-11 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_ordenes_bienes_servicios', '0002_orden_bien_mayor_500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orden_bien',
            name='mayor_500',
            field=models.BooleanField(default=False),
        ),
    ]
