# Generated by Django 4.2.2 on 2023-10-11 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trabajadores', '0007_datospersonalestrabajadores_alter_trabajador_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicaltrabajador',
            name='fecha_ingreso',
        ),
        migrations.RemoveField(
            model_name='trabajador',
            name='fecha_ingreso',
        ),
        migrations.AddField(
            model_name='historicaltrabajador',
            name='cod_biometrico',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Codigo Biometrico'),
        ),
        migrations.AddField(
            model_name='trabajador',
            name='cod_biometrico',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Codigo Biometrico'),
        ),
    ]