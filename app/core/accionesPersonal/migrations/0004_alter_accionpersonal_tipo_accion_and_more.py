# Generated by Django 4.2.2 on 2023-07-14 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0003_alter_accionpersonal_estado_accion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accionpersonal',
            name='tipo_accion',
            field=models.CharField(blank=True, choices=[('INGRESO', 'INGRESO'), ('NOMBRAMIENTO', 'NOMBRAMIENTO'), ('ASCENSO', 'ASCENSO'), ('SUBROGACION', 'SUBROGACION'), ('ENCARGO', 'ENCARGO'), ('VACACIONES', 'VACACIONES'), ('TRASLADO', 'TRASLADO'), ('TRASPASO', 'TRASPASO'), ('CAMBIO ADMINISTRATIVO', 'CAMBIO ADMINISTRATIVO'), ('INTERCAMBIO', 'INTERCAMBIO'), ('COMISION DE SERVICIOS', 'COMISION DE SERVICIOS'), ('LICENCIA', 'LICENCIA'), ('REVALORIZACION', 'REVALORIZACION'), ('RECLASIFICACION', 'RECLASIFICACION'), ('UBICACION', 'UBICACION'), ('REINTEGRO', 'REINTEGRO'), ('RESTITUCION', 'RESTITUCION'), ('RENUNCIA', 'RENUNCIA'), ('SUPRESION', 'SUPRESION'), ('DESTITUCION', 'DESTITUCION'), ('REMOCION', 'REMOCION'), ('JUBILACION', 'JUBILACION'), ('OTRO', 'OTRO')], max_length=255, null=True, verbose_name='Tipo acción de personal'),
        ),
        migrations.AlterField(
            model_name='historicalaccionpersonal',
            name='tipo_accion',
            field=models.CharField(blank=True, choices=[('INGRESO', 'INGRESO'), ('NOMBRAMIENTO', 'NOMBRAMIENTO'), ('ASCENSO', 'ASCENSO'), ('SUBROGACION', 'SUBROGACION'), ('ENCARGO', 'ENCARGO'), ('VACACIONES', 'VACACIONES'), ('TRASLADO', 'TRASLADO'), ('TRASPASO', 'TRASPASO'), ('CAMBIO ADMINISTRATIVO', 'CAMBIO ADMINISTRATIVO'), ('INTERCAMBIO', 'INTERCAMBIO'), ('COMISION DE SERVICIOS', 'COMISION DE SERVICIOS'), ('LICENCIA', 'LICENCIA'), ('REVALORIZACION', 'REVALORIZACION'), ('RECLASIFICACION', 'RECLASIFICACION'), ('UBICACION', 'UBICACION'), ('REINTEGRO', 'REINTEGRO'), ('RESTITUCION', 'RESTITUCION'), ('RENUNCIA', 'RENUNCIA'), ('SUPRESION', 'SUPRESION'), ('DESTITUCION', 'DESTITUCION'), ('REMOCION', 'REMOCION'), ('JUBILACION', 'JUBILACION'), ('OTRO', 'OTRO')], max_length=255, null=True, verbose_name='Tipo acción de personal'),
        ),
    ]
