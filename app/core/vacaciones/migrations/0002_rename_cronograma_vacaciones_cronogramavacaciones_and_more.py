# Generated by Django 4.2.2 on 2023-07-21 20:11

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trabajadores', '0005_historicaltrabajador_id_estructura_programatica_and_more'),
        ('vacaciones', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cronograma_vacaciones',
            new_name='CronogramaVacaciones',
        ),
        migrations.RenameModel(
            old_name='HistoricalCronograma_vacaciones',
            new_name='HistoricalCronogramaVacaciones',
        ),
        migrations.AlterModelOptions(
            name='cronogramavacaciones',
            options={'ordering': ['id'], 'verbose_name': 'cronograma vacaciones', 'verbose_name_plural': 'cronogramas vacaciones'},
        ),
        migrations.AlterModelOptions(
            name='historicalcronogramavacaciones',
            options={'get_latest_by': ('history_date', 'history_id'), 'ordering': ('-history_date', '-history_id'), 'verbose_name': 'historical cronograma vacaciones', 'verbose_name_plural': 'historical cronogramas vacaciones'},
        ),
    ]
