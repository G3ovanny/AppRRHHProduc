# Generated by Django 4.2.2 on 2023-10-12 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('distributivo', '0006_alter_denominacion_puesto_cod_denominacion_puesto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalnivel_ocupacional',
            name='cod_nivel_ocupacional',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Código nivel ocupacional'),
        ),
        migrations.AlterField(
            model_name='nivel_ocupacional',
            name='cod_nivel_ocupacional',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Código nivel ocupacional'),
        ),
    ]