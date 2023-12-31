# Generated by Django 4.2.7 on 2023-12-13 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_historicalusuario_tipousuario_usuario_tipousuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalusuario',
            name='username',
            field=models.CharField(blank=True, db_index=True, max_length=30, null=True, verbose_name='username'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='username',
            field=models.CharField(blank=True, max_length=30, null=True, unique=True, verbose_name='username'),
        ),
    ]
