from django.db import models

from core.base.models import BaseModel
from simple_history.models import HistoricalRecords

from core.trabajadores.models import Trabajador

# Create your models here.

class MotivoPermiso(BaseModel):
    motivo = models.CharField('Motivo del permiso', max_length=255, null=True, blank=True)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = 'motivo de permiso',
        verbose_name_plural = 'motivos del permiso'
        db_table= 'Motivo_Permiso'
        ordering = ['motivo']

    def __str__(self):
        return f'{self.id} {self.motivo}'

class Permiso(BaseModel):
    id_trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE, null=True, blank=True, unique=False, verbose_name='Trabajador')
    id_motivo = models.ForeignKey(MotivoPermiso, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Motivo')
    fecha_hora_salida = models.DateTimeField(verbose_name='Fecha/Hora de Salida', null=True, blank=True)
    #fecha_hora_estimada = models.DateTimeField(verbose_name='Fecha/Hora de Estimada', null=True, blank=True)
    fecha_hora_llegada = models.DateTimeField(verbose_name='Fecha/Hora de LLegada', null=True, blank=True)
    detalle = models.CharField('Detalle',max_length=255, blank=True, null=True)
    min_acumulados = models.IntegerField('Minutos del permiso',blank=True, null=True, unique=False)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name= 'permiso'
        verbose_name_plural = 'permisos'
        db_table = 'Permisos'
        ordering = ['id']

    def __str__(self):
        return f'{self.id_trabajador} {self.id_motivo}'