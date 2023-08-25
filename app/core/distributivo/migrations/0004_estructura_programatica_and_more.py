# Generated by Django 4.2.2 on 2023-07-19 17:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('distributivo', '0003_partida_presupuestaria_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estructura_Programatica',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Fecha de eliminación')),
                ('estructura_programatica', models.CharField(blank=True, max_length=255, null=True, verbose_name='Estructura programatica')),
            ],
            options={
                'verbose_name': 'estructura programatica',
                'verbose_name_plural': 'estructuras programaticas',
                'db_table': 'Estructura_Programatica',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalEstructura_Programatica',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de modificación')),
                ('delete_date', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de eliminación')),
                ('estructura_programatica', models.CharField(blank=True, max_length=255, null=True, verbose_name='Estructura programatica')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical estructura programatica',
                'verbose_name_plural': 'historical estructuras programaticas',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.RemoveField(
            model_name='historicalpartida_presupuestaria',
            name='history_user',
        ),
        migrations.DeleteModel(
            name='Partida_Presupuestaria',
        ),
        migrations.DeleteModel(
            name='HistoricalPartida_Presupuestaria',
        ),
    ]
