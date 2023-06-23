# Generated by Django 4.1.5 on 2023-06-23 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_cajadiaria', '0004_alter_caja_diaria_responsable_apertura_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='egresos_otros',
            name='monto_egreso',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingresos_otros',
            name='monto_ingreso',
            field=models.FloatField(default=0.0),
            preserve_default=False,
        ),
    ]
