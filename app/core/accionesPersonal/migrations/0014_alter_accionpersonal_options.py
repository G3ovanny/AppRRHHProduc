# Generated by Django 4.2.7 on 2024-01-29 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0013_alter_accionpersonal_partida_propuesta_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accionpersonal',
            options={'ordering': ['-fecha_accion__year', '-contador'], 'verbose_name': 'Acción de personal', 'verbose_name_plural': 'Acciones de personal'},
        ),
    ]
