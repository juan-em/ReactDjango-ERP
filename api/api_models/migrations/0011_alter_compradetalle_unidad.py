# Generated by Django 4.1.5 on 2023-02-17 01:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_models', '0010_articulovariante_compra_compradetalle_remisioncompra_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compradetalle',
            name='unidad',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api_models.unidad'),
        ),
    ]
