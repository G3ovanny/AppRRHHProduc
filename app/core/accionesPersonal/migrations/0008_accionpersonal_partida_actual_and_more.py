# Generated by Django 4.2.2 on 2023-07-14 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accionesPersonal', '0007_alter_accionpersonal_doc_base_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='accionpersonal',
            name='partida_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='partida_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='partida_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='partida_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='proceso_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='proceso_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='proceso_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='proceso_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='puesto_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='puesto_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='puesto_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='puesto_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='rmu_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='rmu_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='rmu_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='rmu_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='subproceso_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='subproceso_actual'),
        ),
        migrations.AddField(
            model_name='accionpersonal',
            name='subproceso_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='subproceso_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='partida_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='partida_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='partida_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='partida_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='proceso_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='proceso_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='proceso_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='proceso_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='puesto_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='puesto_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='puesto_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='puesto_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='rmu_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='rmu_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='rmu_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='rmu_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='subproceso_actual',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='subproceso_actual'),
        ),
        migrations.AddField(
            model_name='historicalaccionpersonal',
            name='subproceso_propuesta',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='subproceso_actual'),
        ),
    ]
