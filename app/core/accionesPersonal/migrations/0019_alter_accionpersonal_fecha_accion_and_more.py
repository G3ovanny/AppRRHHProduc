# Generated by Django 4.2.7 on 2024-12-03 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0018_remove_accionpersonal_grado_propuesto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accionpersonal',
            name='fecha_accion',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Fecha acción de personal'),
        ),
        migrations.AlterField(
            model_name='historicalaccionpersonal',
            name='fecha_accion',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Fecha acción de personal'),
        ),
    ]