# Generated by Django 4.1.5 on 2023-02-22 13:52

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_models', '0006_remove_producto_color_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto_variante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('color', models.TextField(blank=True, default='-', null=True)),
                ('talla', models.TextField(blank=True, default='-', null=True)),
                ('horas_manufactura', models.IntegerField(default=0)),
                ('costo_manufactura', models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0.0)])),
                ('gastos_generales', models.FloatField(default=30.0, validators=[django.core.validators.MinValueValidator(0.0)])),
                ('precio_final', models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0.0)])),
                ('borrado', models.BooleanField(default=False, null=True)),
                ('producto', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producto_variante', to='api_models.producto')),
            ],
        ),
        migrations.RemoveField(
            model_name='producto_detalle',
            name='vercion',
        ),
        migrations.DeleteModel(
            name='Producto_version',
        ),
        migrations.AddField(
            model_name='producto_detalle',
            name='variante',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producto_detalle', to='api_models.producto_variante'),
        ),
    ]
