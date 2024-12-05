# Generated by Django 4.2.7 on 2024-11-29 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0016_remove_accionpersonal_grupo_actual_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accionpersonal',
            name='grado',
        ),
        migrations.RemoveField(
            model_name='accionpersonal',
            name='grado_propuesta',
        ),
        migrations.RemoveField(
            model_name='historicalaccionpersonal',
            name='grado',
        ),
        migrations.RemoveField(
            model_name='historicalaccionpersonal',
            name='grado_propuesta',
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='grado_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='grado_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='grado_propuesto',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='grado_propuesto'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='grado_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='grado_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='grado_propuesto',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='grado_propuesto'),
        ),
    ]
