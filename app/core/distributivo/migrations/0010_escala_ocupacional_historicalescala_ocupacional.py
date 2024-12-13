# Generated by Django 4.2.7 on 2024-11-29 15:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('distributivo', '0009_denominacion_puesto_id_proceso_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Escala_Ocupacional',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de eliminación')),
                ('cod_escala_ocupacional', models.CharField(blank=True, max_length=255, null=True, verbose_name='Código escala ocupacional')),
                ('escala_ocupacional', models.CharField(blank=True, max_length=255, null=True, verbose_name='Nombre escala ocupacional')),
            ],
            options={
                'verbose_name': 'escala ocupacional',
                'verbose_name_plural': 'nivel ocupacional',
                'db_table': 'Escala_ocupacional',
                'ordering': ['escala_ocupacional'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalEscala_Ocupacional',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de eliminación')),
                ('cod_escala_ocupacional', models.CharField(blank=True, max_length=255, null=True, verbose_name='Código escala ocupacional')),
                ('escala_ocupacional', models.CharField(blank=True, max_length=255, null=True, verbose_name='Nombre escala ocupacional')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical escala ocupacional',
                'verbose_name_plural': 'historical nivel ocupacional',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]