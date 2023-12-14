# Generated by Django 4.2.7 on 2023-12-13 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_alter_historicalusuario_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalusuario',
            name='clave_temporal',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='historicalusuario',
            name='fecha_clave',
            field=models.DateField(blank=True, editable=False, null=True, verbose_name='Fecha cambio contraseña'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='clave_temporal',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='fecha_clave',
            field=models.DateField(auto_now=True, null=True, verbose_name='Fecha cambio contraseña'),
        ),
    ]
