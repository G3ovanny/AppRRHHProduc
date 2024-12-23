from django.db import models
from simple_history.models import HistoricalRecords
from ..base.models import BaseModel

# Create your models here.


class Regimen_Laboral(BaseModel):
    cod_regimen = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Código régimen laboral')
    regimen_laboral = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre régimen laboral')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.regimen_laboral

    class Meta:
        verbose_name = 'regimen laboral'
        verbose_name_plural = 'regimen laboral'
        db_table = 'Regimen_laboral'
        ordering = ['regimen_laboral']


class Nivel_Ocupacional(BaseModel):
    cod_nivel_ocupacional = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Código nivel ocupacional')
    nivel_ocupacional = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre nivel ocupacional')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.nivel_ocupacional

    class Meta:
        verbose_name = 'nivel ocupacional'
        verbose_name_plural = 'nivel ocupacional'
        db_table = 'Nivel_ocupacional'
        ordering = ['nivel_ocupacional']


class Modalidad_Laboral(BaseModel):
    cod_modalidad = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Código modalidad laboral')
    modalidad_laboral = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre modalidad laboral')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.modalidad_laboral

    class Meta:
        verbose_name = 'modalidad laboral'
        verbose_name_plural = 'modalidades laborales'
        db_table = 'Modalida_Laboral'
        ordering = ['modalidad_laboral']


class Estado_Puesto(BaseModel):
    estado_puesto = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Estado del puesto')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.estado_puesto

    class Meta:
        verbose_name = 'estado puesto'
        verbose_name_plural = 'estados puesto'
        db_table = 'Estado_puesto'
        ordering = ['estado_puesto']


class Grado(BaseModel):
    grado = models.CharField(max_length=255, blank=True,null=True, verbose_name='Grado')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.grado

    class Meta:
        verbose_name = 'grado'
        verbose_name_plural = 'grados'
        db_table = 'Grado'
        ordering = ['id']


class Proceso(BaseModel):
    proceso =  models.CharField(max_length=255, blank=True, null=True, verbose_name= 'Proceso')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value
    
    def __str__(self):
        return self.proceso

    class Meta:
        verbose_name = 'proceso'
        verbose_name_plural = 'procesos'
        db_table = 'Proceso'
        ordering = ['proceso']

class Denominacion_Puesto(BaseModel):
    id_proceso = models.ForeignKey(Proceso, on_delete=models.CASCADE, null=True, blank=True, unique=False, verbose_name='Proceso')
    cod_denominacion_puesto = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Código denominación puesto')
    denominacion_puesto = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre denominación puesto')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.denominacion_puesto

    class Meta:
        verbose_name = 'denominacion puesto'
        verbose_name_plural = 'denominaciones puestos'
        db_table = 'Denominacion_Puesto'
        ordering = ['denominacion_puesto']


class Unidad_Organica(BaseModel):
    cod_unidad = models.CharField(max_length=255, blank=True, null=True, verbose_name='Código unidad orgánica')
    unidad_organica = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre unidad orgánica')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.unidad_organica

    class Meta:
        verbose_name = 'unidad organica'
        verbose_name_plural = 'unidades organicas'
        db_table = 'Unidad_Organica'
        ordering = ['id']


class Estructura_Programatica(BaseModel):
    estructura_programatica = models.CharField(max_length=255, blank=True, null=True, verbose_name='Estructura programatica')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.estructura_programatica

    class Meta:
        verbose_name = 'estructura programatica'
        verbose_name_plural = 'estructuras programaticas'
        db_table = 'Estructura_Programatica'
        ordering = ['id']


class Escala_Ocupacional(BaseModel):
    cod_escala_ocupacional = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Código escala ocupacional')
    escala_ocupacional = models.CharField(
        max_length=255, blank=True, null=True, verbose_name='Nombre escala ocupacional')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    def __str__(self):
        return self.escala_ocupacional

    class Meta:
        verbose_name = 'escala ocupacional'
        verbose_name_plural = 'escalas ocupacionales'
        db_table = 'Escala_ocupacional'
        ordering = ['escala_ocupacional']