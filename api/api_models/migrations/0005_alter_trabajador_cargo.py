# Generated by Django 4.1.5 on 2023-06-17 02:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_models', '0004_alter_trabajador_fecha_nacimiento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trabajador',
            name='cargo',
            field=models.CharField(default='Ninguno', max_length=50),
        ),
    ]
