# Generated by Django 4.1.5 on 2023-03-24 16:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Propuesta_economica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propuesta_economica_nombre', models.CharField(max_length=100)),
                ('propuesta_economica_tipo', models.CharField(choices=[('Ninguno', 'Ninguno'), ('Servicio', 'Servicio'), ('Bien', 'Bien')], default='Ninguno', max_length=50)),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Propuesta_tecnica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propuesta_tecnica_nombre', models.CharField(max_length=100)),
                ('propuesta_tecnica_tipo', models.CharField(choices=[('Ninguno', 'Ninguno'), ('Servicio', 'Servicio'), ('Bien', 'Bien')], default='Ninguno', max_length=50)),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Orden_bien',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bien_nombre', models.CharField(max_length=500)),
                ('bien_estado', models.CharField(choices=[('Ninguno', 'Ninguno'), ('Solicitando cotización', 'Solicitando cotización'), ('Aprobado', 'Aprobado'), ('En progreso', 'En progreso'), ('Denegado', 'Denegado')], default='Ninguno', max_length=50)),
                ('bien_cotizacion', models.FloatField(null=True)),
                ('bien_propuesta_economica', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='propuesta_economica', to='api_ordenes_bienes_servicios.propuesta_economica')),
                ('bien_propuesta_tecnica', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='propuesta_tecnica', to='api_ordenes_bienes_servicios.propuesta_tecnica')),
            ],
        ),
    ]
