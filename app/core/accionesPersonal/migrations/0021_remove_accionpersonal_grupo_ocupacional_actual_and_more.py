# Generated by Django 4.2.7 on 2024-12-05 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0020_remove_accionpersonal_grupo_ocupacional_actual_propuesta_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accionpersonal',
            name='grupo_ocupacional_actual',
        ),
        migrations.RemoveField(
            model_name='historicalaccionpersonal',
            name='grupo_ocupacional_actual',
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='escala_ocupacional_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='escala_ocupacional_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='escala_ocupacional_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='escala_ocupacional_actual'),
        ),
    ]
