# Generated by Django 4.1.5 on 2023-03-02 15:14

import api_models.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_models', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compra',
            name='fecha',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='compradetalle',
            name='cantidad',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='compradetalle',
            name='compra',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalle_compra', to='api_models.compra'),
        ),
        migrations.AlterField(
            model_name='compradetalle',
            name='unidad',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(default='blancos.png', upload_to=api_models.models.upload_toProd, verbose_name='Image'),
        ),
    ]
