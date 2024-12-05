from django.db import models

from ..base.models import BaseModel
from ..trabajadores.models import Trabajador
from simple_history.models import HistoricalRecords
# Create your models here.


class AccionPersonal(BaseModel):
    id_trabajador = models.ForeignKey(
        Trabajador, blank=True, null=True, on_delete=models.SET_NULL)
    contador = models.IntegerField(
        'Contador', blank=True, null=True, default=1)
    fecha_accion = models.DateTimeField(
        'Fecha acción de personal', blank=True, null=True)
    fecha_rigue = models.DateField('Fecha rigue', blank=True, null=True)
    fecha_rigue_hasta = models.DateField('Fecha rigue hasta', blank=True, null=True)

    declaracion_jurada = models.BooleanField('Delcaracion jurada', default= True)

    proceso_actual = models.CharField(
        'proceso_actual', max_length=255, blank=True, null=True)
    subproceso_actual = models.CharField(
        'subproceso_actual', max_length=255, blank=True, null=True)
    puesto_actual = models.CharField(
        'puesto_actual', max_length=255, blank=True, null=True)
    rmu_actual = models.CharField(
        'rmu_actual', max_length=255, blank=True, null=True)
    estructura_actual = models.CharField(
        'estructura_actual', max_length=255, blank=True, null=True)
    partida_actual = models.CharField(
        'partida_actual', max_length=255, blank=True, null=True)
    escala_ocupacional_actual = models.CharField(
        'escala_ocupacional_actual', max_length=255, blank=True, null=True)
    grado_actual = models.CharField(
        'grado_actual', max_length=255, blank=True, null=True)

    proceso_propuesta = models.CharField(
        'proceso_propuesta', max_length=255, blank=True, null=True)
    subproceso_propuesta = models.CharField(
        'subproceso_propuesta', max_length=255, blank=True, null=True)
    puesto_propuesta = models.CharField(
        'puesto_propuesta', max_length=255, blank=True, null=True)
    rmu_propuesta = models.CharField(
        'rmu_propuesta', max_length=255, blank=True, null=True)
    estructura_propuesta = models.CharField(
        'estructura_propuesta', max_length=255, blank=True, null=True)
    partida_propuesta = models.CharField(
        'partida_propuesta', max_length=255, blank=True, null=True)
    escala_ocupacional_propuesta = models.CharField(
        'escala_ocupacional_actual_propuesta', max_length=255, blank=True, null=True)
    grado_propuesta = models.CharField(
        'grado_propuesta', max_length=255, blank=True, null=True)

    explicacion = models.CharField(
        'Explicacion', max_length=600, blank=True, null=True)
    otro_tipo = models.CharField('Otro tipo de acción', max_length=155, blank=True, null=True)
    TIPOS_ACCION = (
        ('INGRESO', 'INGRESO'),
        ('REINGRESO', 'REINGRESO'),
        ('RESTITUCION', 'RESTITUCION'),
        ('REINTEGRO', 'REINTEGRO'),
        ('ASCENSO', 'ASCENSO'),
        ('TRASLADO', 'TRASLADO'),
        ('TRASPASO', 'TRASPASO'),
        ('CAMBIO ADMINISTRATIVO', 'CAMBIO ADMINISTRATIVO'),
        ('INTERCAMBIO VOLUNTARIO', 'INTERCAMBIO VOLUNTARIO'),
        ('LICENCIA', 'LICENCIA'),
        ('COMISION DE SERVICIOS', 'COMISION DE SERVICIOS'),
        ('SANCIONES', 'SANCIONES'),
        ('INCREMENTO RMU', 'INCREMENTO RMU'),
        ('SUBROGACION', 'SUBROGACION'),
        ('ENCARGO', 'ENCARGO'),
        ('CESACION DE FUNCIONES', 'CESACION DE FUNCIONES'),
        ('DESTITUCION', 'DESTITUCION'),
        ('VACACIONES', 'VACACIONES'),
        ('REVISION CLASI. PUESTO', 'REVISION CLASI. PUESTO'),
        ('OTRO', 'OTRO'),
        
    )
    tipo_accion = models.CharField(max_length=255, choices=TIPOS_ACCION,
                                   blank=True, null=True, verbose_name='Tipo acción de personal')
    detalle_tipo_accion = models.CharField('Detalle tipo accion',max_length=255, blank=True, null=True)

    DOC_BASE = (
        ('DECRETO', 'DECRETO'),
        ('ACUERDO', 'ACUERDO'),
        ('RESOLUCION', 'RESOLUCION'),
    )
    doc_base = models.CharField(
        max_length=255, choices=DOC_BASE, blank=True, null=True, verbose_name='Documento base')

    num_doc = models.CharField(
        'Número documento base', max_length=255, blank=True, null=True)

    fecha_doc = models.DateField('Fecha documento base', blank=True, null=True)

    ESTADO = (
        ('VIGENTE', 'VIGENTE'),
        ('LEGALIZADO', 'LEGALIZADO'),
        ('ANULADO', 'ANULADO'),
    )
    estado_accion = models.CharField(max_length=255, choices=ESTADO, blank=True,
                                     null=True, default='VIGENTE', verbose_name='Estado acción de personal')

    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Acción de personal"
        verbose_name_plural = "Acciones de personal"
        db_table = 'Accion_personal'
        ordering = ['-fecha_accion__year','-contador']

    def __str__(self):
        return f'{self.id}'


class ArchivoAcciones(BaseModel):
    doc = models.FileField(upload_to='./static/archivoAcciones')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Archivo Accion de personal"
        verbose_name_plural = "Archivos Acciones de personal"
        db_table = 'Archivo_Acciones'
        ordering = ['id']
