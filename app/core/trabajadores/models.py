from django.db import models

from core.base.models import BaseModel
from ..distributivo.models import *
from simple_history.models import HistoricalRecords

# Create your models here.

class Trabajador(BaseModel):
    id_regimen_laboral= models.ForeignKey(Regimen_Laboral,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Regimen laboral')
    id_nivel_ocupacional = models.ForeignKey(Nivel_Ocupacional,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Nivel ocupacional')
    id_modalidad_laboral = models.ForeignKey(Modalidad_Laboral,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Modalidad laboral')
    id_unidad_organica = models.ForeignKey(Unidad_Organica,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Unidad orgánica')
    id_denominacion_puesto = models.ForeignKey(Denominacion_Puesto,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Denominación del puesto')
    id_estructura_programatica = models.ForeignKey(Estructura_Programatica,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Estructura programática')

    numero_identificacion = models.CharField('Cédula', max_length=255, blank=True, null=False)
    nombres = models.CharField('Nombres', max_length=255, blank=True, null=False)
    celular = models.CharField('Celular', max_length=255, blank=True, null=True)
    correo_personal = models.EmailField('Correo electrónico personal', max_length=255, blank=True, null=True)
    correo_institucional = models.EmailField('Correo institucional', max_length=255, blank=True, null=True)
    
    partida_individual = models.CharField('Partida individual', max_length=255, blank=True, null=True)
    rmu_puesto = models.CharField('RMU del puesto', max_length=255, blank=True, null=True)
    estado_servidor = models.CharField('Estado servidor', max_length=255, blank=True, null=True)
    
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    direccion_domicilio = models.CharField('Direccioón domicilio', max_length=255, blank=True, null=True)
    dias_vacaciones = models.DecimalField('Dias de vacaciones acumulados', max_digits=5, decimal_places=2, blank=True, null=True)

    TIPO_IDENTIFICACION=(
        ('CÉDULA', 'CÉDULA'),
        ('PASAPORTE', 'PASAPORTE'),
        ('OTRO', 'OTRO'),
    )
    tipo_identificacion = models.CharField('Tipo identificación', choices=TIPO_IDENTIFICACION, max_length=255, blank=True, null=True)

    ETNIA=(
        ('Blanco', 'BLANCO'),
        ('Indigena', 'INDIGENA'),
        ('Mestizo', 'MESTIZO'),
        ('Montubio', 'MONTUBIO'),
        ('Mulato', 'MULATO'),
        ('Negro', 'NEGRO'),
        ('Saraguro', 'SARAGURO'),
        ('Otro', 'OTRO'),
    )
    etnia = models.CharField('Etnia', choices=ETNIA, max_length=255, blank=True, null=True)

    DISCAPACIDAD = (
        ('Ninguna', 'NINGUNA'),
        ('Discapacidad', 'DISCAPACIDAD'),
        ('Sustituto', 'SUSTITUTO'),
    )
    discapacidad = models.CharField('Discapacidad', choices=DISCAPACIDAD, max_length=255, blank=True, null=True)
    
    ESTADO = (
        ('Embarazo', 'EMBARAZO'),
        ('Lactancia', 'LACTANCIA'),
        ('Ninguno', 'NINGUNO'),
    )
    estado_maternidad = models.CharField(max_length=255, choices=ESTADO, blank=True, null=True, verbose_name='Estado Maternidad')
    
    GENERO = (
        ('Masculino', 'MASCULINO'),
        ('Femenino', 'FEMENINO'),
    )
    genero = models.CharField(max_length=255, choices=GENERO, blank=True, null=True, verbose_name='Género')
    historical = HistoricalRecords()

    class Meta:
        verbose_name = 'trabajador'
        verbose_name_plural = 'trabajadores'
        db_table = 'Trabajador'
        ordering = ['nombres']

    def __str__(self):
        return f'{self.nombres}'
    
class ArchivoTrabajadores(BaseModel):
    doc= models.FileField(upload_to='./static/archivoTrabajadores')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Archivo Trabajadores"
        verbose_name_plural = "Archivos Trabajadores"
        db_table = 'Archivo_trabajadores'
        ordering = ['id']