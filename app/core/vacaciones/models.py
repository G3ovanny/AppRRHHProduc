from django.db import models
from simple_history.models import HistoricalRecords
from ..base.models import BaseModel

from ..trabajadores.models import Trabajador
# Create your models here.


class CronogramaVacaciones(BaseModel):
    id_trabajador = models.ForeignKey(
        Trabajador, blank=True, null=True, on_delete=models.SET_NULL)
    fecha_solicitud = models.DateField(
        blank=True, null=True, auto_now=True, verbose_name='Fecha solicitud')
    fecha_inicio = models.DateField(
        blank=True, null=True, verbose_name='Fecha desde')
    fecha_fin = models.DateField(
        blank=True, null=True, verbose_name='Fecha hasta')
    min_acumulados = models.IntegerField(blank=True, null=True, unique=False)
    explicacion = models.CharField(
        'Explicacion', max_length=600, blank=True, null=True)
    estado_accion = models.BooleanField(
        default=False, null=True, blank=True, verbose_name='Estado accion')

    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "cronograma vacaciones"
        verbose_name_plural = "cronogramas vacaciones"
        db_table = 'Cronograma_vacaciones'
        ordering = ['-id']

    def __str__(self):
        return str(self.fecha_inicio)


class ArchivoCronograma(BaseModel):
    doc = models.FileField(upload_to = 'archivoCronograma')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Archivo cronograma"
        verbose_name_plural = "Archivos cronograma"
        db_table = 'Archivo_cronograma'
        ordering = ['id']