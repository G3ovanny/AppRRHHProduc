# Generated by Django 4.2.2 on 2023-07-07 13:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trabajadores', '0004_alter_historicaltrabajador_dias_vacaciones_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalAccionPersonal',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de eliminación')),
                ('contador', models.IntegerField(blank=True, default=1, null=True, verbose_name='Contador')),
                ('fecha', models.DateField(blank=True, null=True, verbose_name='Fecha acción de personal')),
                ('explicacion', models.CharField(blank=True, max_length=255, null=True, verbose_name='Explicacion')),
                ('tipo_accion', models.CharField(blank=True, choices=[('INGRESO', 'INGRESO'), ('NOMBRAMIENTO', 'NOMBRAMIENTO'), ('ASCENSO', 'ASCENSO'), ('SUBROGACION', 'SUBROGACION'), ('ENCARGO', 'ENCARGO'), ('VACACIONES', 'VACACIONES'), ('TRASLADO', 'TRASLADO'), ('TRASPASO', 'TRASPASO'), ('CAMBIO ADMINISTRATIVO', 'CAMBIO ADMINISTRATIVO'), ('INTERCAMBIO', 'INTERCAMBIO'), ('COMISION DE SERVICIOS', 'COMISION DE SERVICIOS'), ('LICENCIA', 'LICENCIA'), ('REVALORIZACION', 'REVALORIZACION'), ('RECLASIFICACION', 'RECLASIFICACION'), ('UBICACION', 'UBICACION'), ('REINTEGRO', 'REINTEGRO'), ('RESTITUCION', 'RESTITUCION'), ('RENUNCIA', 'RENUNCIA'), ('SUPRESION', 'SUPRESION'), ('DESTITUCION', 'DESTITUCION'), ('REMOCION', 'REMOCION'), ('OTRO', 'OTRO')], max_length=255, null=True, verbose_name='Tipo acción de personal')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('id_trabajador', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='trabajadores.trabajador')),
            ],
            options={
                'verbose_name': 'historical Acción de personal',
                'verbose_name_plural': 'historical Acciones de personal',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='AccionPersonal',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de eliminación')),
                ('contador', models.IntegerField(blank=True, default=1, null=True, verbose_name='Contador')),
                ('fecha', models.DateField(blank=True, null=True, verbose_name='Fecha acción de personal')),
                ('explicacion', models.CharField(blank=True, max_length=255, null=True, verbose_name='Explicacion')),
                ('tipo_accion', models.CharField(blank=True, choices=[('INGRESO', 'INGRESO'), ('NOMBRAMIENTO', 'NOMBRAMIENTO'), ('ASCENSO', 'ASCENSO'), ('SUBROGACION', 'SUBROGACION'), ('ENCARGO', 'ENCARGO'), ('VACACIONES', 'VACACIONES'), ('TRASLADO', 'TRASLADO'), ('TRASPASO', 'TRASPASO'), ('CAMBIO ADMINISTRATIVO', 'CAMBIO ADMINISTRATIVO'), ('INTERCAMBIO', 'INTERCAMBIO'), ('COMISION DE SERVICIOS', 'COMISION DE SERVICIOS'), ('LICENCIA', 'LICENCIA'), ('REVALORIZACION', 'REVALORIZACION'), ('RECLASIFICACION', 'RECLASIFICACION'), ('UBICACION', 'UBICACION'), ('REINTEGRO', 'REINTEGRO'), ('RESTITUCION', 'RESTITUCION'), ('RENUNCIA', 'RENUNCIA'), ('SUPRESION', 'SUPRESION'), ('DESTITUCION', 'DESTITUCION'), ('REMOCION', 'REMOCION'), ('OTRO', 'OTRO')], max_length=255, null=True, verbose_name='Tipo acción de personal')),
                ('id_trabajador', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='trabajadores.trabajador')),
            ],
            options={
                'verbose_name': 'Acción de personal',
                'verbose_name_plural': 'Acciones de personal',
                'db_table': 'Accion_personal',
                'ordering': ['id'],
            },
        ),
    ]
