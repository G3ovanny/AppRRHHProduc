# Generated by Django 4.2.7 on 2024-12-23 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0022_rename_escala_ocupacional_actual_propuesta_accionpersonal_escala_ocupacional_propuesta_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accionpersonal',
            name='escala_ocupacional_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='escala_ocupacional_propuesta'),
        ),
        migrations.AlterField(
            model_name='historicalaccionpersonal',
            name='escala_ocupacional_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='escala_ocupacional_propuesta'),
        ),
    ]