# Generated by Django 4.2.2 on 2023-10-12 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('distributivo', '0005_proceso_alter_denominacion_puesto_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='denominacion_puesto',
            name='cod_denominacion_puesto',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Código denominación puesto'),
        ),
        migrations.AlterField(
            model_name='historicaldenominacion_puesto',
            name='cod_denominacion_puesto',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True, verbose_name='Código denominación puesto'),
        ),
        migrations.AlterField(
            model_name='historicalmodalidad_laboral',
            name='cod_modalidad',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True, verbose_name='Código modalidad laboral'),
        ),
        migrations.AlterField(
            model_name='historicalnivel_ocupacional',
            name='cod_nivel_ocupacional',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True, verbose_name='Código nivel ocupacional'),
        ),
        migrations.AlterField(
            model_name='historicalregimen_laboral',
            name='cod_regimen',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True, verbose_name='Código régimen laboral'),
        ),
        migrations.AlterField(
            model_name='historicalunidad_organica',
            name='cod_unidad',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True, verbose_name='Código unidad orgánica'),
        ),
        migrations.AlterField(
            model_name='modalidad_laboral',
            name='cod_modalidad',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Código modalidad laboral'),
        ),
        migrations.AlterField(
            model_name='nivel_ocupacional',
            name='cod_nivel_ocupacional',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Código nivel ocupacional'),
        ),
        migrations.AlterField(
            model_name='regimen_laboral',
            name='cod_regimen',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Código régimen laboral'),
        ),
        migrations.AlterField(
            model_name='unidad_organica',
            name='cod_unidad',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Código unidad orgánica'),
        ),
    ]