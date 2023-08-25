from django.db import models
from ..base.models import BaseModel
from ..trabajadores.models import Trabajador
from simple_history.models import HistoricalRecords
# Create your models here.

class Asistencia(BaseModel):
    id_trabajador = models.ForeignKey(Trabajador, blank=True, null=True, on_delete=models.SET_NULL)
    fecha_registro = models.DateTimeField('Fecha de registro asistencia', blank=True, null=True)
    estado = models.CharField('Estado asistencia', max_length=255, blank=True, null=True)
    edificio = models.CharField('Edificio', max_length=255, blank=True, null=True)
    hora = models.DateTimeField('Hora registro asistencia', blank=True, null=True)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Asistencia"
        verbose_name_plural = "Asistencias"
        db_table = 'Asistencia'
        ordering = ['id']

    def __str__(self):
        return f'{self.id}'