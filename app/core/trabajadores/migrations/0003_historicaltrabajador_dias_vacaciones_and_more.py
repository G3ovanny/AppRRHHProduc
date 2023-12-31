# Generated by Django 4.2.2 on 2023-06-30 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trabajadores', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicaltrabajador',
            name='dias_vacaciones',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True, verbose_name='Dias de vacaciones acumulados'),
        ),
        migrations.AddField(
            model_name='trabajador',
            name='dias_vacaciones',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True, verbose_name='Dias de vacaciones acumulados'),
        ),
    ]
