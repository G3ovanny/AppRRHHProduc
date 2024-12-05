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
    id_escala_ocupacional = models.ForeignKey(Escala_Ocupacional,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Escala ocupacional')
    id_grado = models.ForeignKey(Grado,  blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Grado')

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
    #fecha_ingreso = models.DateField(blank=True, null=True)
    direccion_domicilio = models.CharField('Direccioón domicilio', max_length=255, blank=True, null=True)
    dias_vacaciones = models.DecimalField('Dias de vacaciones acumulados', max_digits=5, decimal_places=2, blank=True, null=True)
    cod_biometrico = models.CharField('Codigo Biometrico', max_length=100, blank=True, null= True)

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
    

    def desactivar(self):
        self.state = False
        self.save()

class ArchivoTrabajadores(BaseModel):
    doc= models.FileField(upload_to='archivoTrabajadores')
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

class CorreoTrabajadores(BaseModel):
    doc= models.FileField(upload_to='correosTrabajadores')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Correo Trabajadores"
        verbose_name_plural = "Correos Trabajadores"
        db_table = 'Correo_trabajadores'
        ordering = ['id']


class VacacionesTrabajadores(BaseModel):
    doc= models.FileField(upload_to='vacacionesTrabajadores')
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Vacaciones Trabajadore"
        verbose_name_plural = "Vacaciones Trabajadores"
        db_table = 'Vacaciones_trabajadores'
        ordering = ['id']



################################################################ datos personales de los servidores
class DatosPersonalesTrabajadores(BaseModel):
    apellido_paterno = models.CharField('apellido_paterno', max_length=255, blank= True, null=True)
    apellido_materno = models.CharField('apellido_materno', max_length=255, blank= True, null=True)
    primer_nombre = models.CharField('primer_nombre', max_length=255, blank= True, null=True)
    segundo_nombre = models.CharField('segundo_nombre', max_length=255, blank= True, null=True)
    provincia = models.CharField('provincia', max_length=255, blank= True, null=True)
    ciudad = models.CharField('ciudad', max_length=255, blank= True, null=True)
    nacionalidad = models.CharField('nacionalidad', max_length=255, blank= True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    GENERO = (
        ('Masculino', 'MASCULINO'),
        ('Femenino', 'FEMENINO'),
        ('LGBTI', 'LGBTI'),
    )
    genero = models.CharField(max_length=255, choices=GENERO, blank=True, null=True, verbose_name='Género')
    num_pasaporte = models.CharField('número de pasaporte', max_length=255, blank= True, null=True)
    
    TIPO_PASAPORTE = (
        ('Pasaporte', 'PASAPORTE'),
        ('Visa', 'VISA'),
        ('Carnet de refugiado','CARNET DE REFUGIADO')
    )
    tipo_pasaporte = models.CharField(max_length=255, choices=TIPO_PASAPORTE, blank=True, null=True, verbose_name='Pasaporte')
    discapacidad = models.BooleanField('Discapacidad', default = False)
    num_carnet_conadis = models.CharField('Número del carnet de conadis',  max_length=255, blank= True, null=True)
    TIPO_DISCAPACIDAD = (
        ('Física Motora', 'FISICA MOTORA'),
        ('Auditiva', 'AUDITIVA'),
        ('Intelectual', 'INTELECTUAL'),
        ('Lenguaje', 'LENGUAJE'),
        ('Psicosocial', 'PSICOSOCIAL'),
        ('Visual', 'VISUAL')
    )
    tipo_discapacidad = models.CharField('Tipo de discapacidad', choices=TIPO_DISCAPACIDAD, max_length=255, blank=True, null=True)
    porcentaje_discapacidad = models.PositiveSmallIntegerField('Porcentaje discapacidad', blank=True, null=True)
    enfermedad_catastrofica = models.BooleanField('Enfermedad catastrofica', default = False)
    TIPO_ENFERMEDAD = (
        ('Aneurisma tóraco-abdominaI', 'ANEURISNA TORACO-ABDOMINAL'),
        ('Insuficiencia renal crónica', 'INSUFICIENCIA RENAL CRONICA'),
        ('Malformaciones arterio venosas cerebrales', 'MALFORMACIONES ARTERIO VENOSAS CEREBRALES'),
        ('Malformaciones congénitas ', 'MALFORMACIONES CONGENITAS'),
        ('Secuelas de quemaduras graves', 'SECUELAS DE QUEMADURAS GRAVES'),
        ('Síndrome de Klippel Trenaunay', 'SINDROME DE KLIPPERL TRENAUNAY'),
        ('Todo tipo de cáncer', 'TODO TIPOS DE CANCER'),
        ('Trasplante de órganos: riñón, hígado, médula ósea', 'TRANSPLANTE DE ORGANOS: RIÑON, HIGADO, MEDULA OSEA'),
        ('Tumor cerebral en cualquier estado y de cualquier tipo', 'TUMOR CEREBRAL EN CUALQUIER ESTADO Y TIPO'),
        ('Tumores malignos', 'TUMORES MALIGNOS'),
        ('Enfermedad de Hodgkin', 'ENFERMEDAD DE HODGKIN'),
        ('Leucemia', 'LEUCEMIA'),
        ('Carcinoma', 'CARCINOMA'),
        ('Otras enfermedades', 'OTRAS ENFERMEDADES'),

    )
    tipo_enfermedad = models.CharField(max_length=255, choices=TIPO_ENFERMEDAD, blank=True, null=True, verbose_name='Tipo de sangre')
    detalle_enfermedad = models.CharField('Detalle enfermedad', max_length=600, blank= True, null=True )
    TIPO_SANGRE = (
        ('O Positivo', 'O POSITIVO'),
        ('O Negativo', 'O NEGATIVO'),
        ('A Positivo', 'A POSITIVO'),
        ('A Negativo', 'A NEGATIVO'),
        ('B Positivo', 'B POSITIVO'),
        ('B Negativo', 'B NEGATIVO'),
        ('AB Positivo', 'AB POSITIVO'),
        ('AB Negativo', 'AB NEGATIVO'),

    )
    tipo_sangre = models.CharField(max_length=255, choices=TIPO_SANGRE, blank=True, null=True, verbose_name='Tipo de sangre')
    num_libreta_militar = models.CharField('Número de libreta militar',max_length=255, blank=True, null=True, )
    TIPO_LIBRETA = (
        ('Reservista', 'RESERVISTA'),
        ('No Favorecido', 'NO FAVORECIDO'),
        ('Extento', 'EXTENTO'),
        ('Extrangero', 'EXTRANGERO'),
        ('No Idoneo', 'MO IDONEO'),
        ('Remiso Sancionado', 'REMISO SAMCIONADO'),
        ('Licencia Final', 'LICENCIA FINAL'),

    )
    tipo_libreta = models.CharField(max_length=255, choices=TIPO_LIBRETA, blank=True, null=True, verbose_name='Tipo de libreta militar')
    correo_personal = models.EmailField('Correo electrónico personal', max_length=255, blank=True, null=True)
    correo_institucional = models.EmailField('Correo institucional', max_length=255, blank=True, null=True)
    ETNIA=(
        ('Afroecuatoriano', 'AFROECUATORIANO'),
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
    NACIONALIDAD_INDIGENA=(
        ('Achuar', 'ACHUAR'),
        ('Al Cofan', 'AL COFAN'),
        ('Andoa', 'ANDOA'),
        ('Awa', 'AWA'),
        ('Cachi', 'CHACHI'),
        ('Chibuelo', 'CHIBULEO'),
        ('Epera', 'EPERA'),
        ('Huancavilca', 'HUANCAVILCA'),
        ('Huaorani', 'HUAORANI'),
        ('Kañari', 'KAÑARI'),
        ('Karanki', 'KARANKI'),
        ('Kayambi', 'KAYAMBI'),
        ('Kichwa', 'KICHWA'),
        ('Kitukara', 'KITUKARA'),
        ('Manta', 'MANTA'),
        ('Natabuela', 'NATABUELA'),
        ('Otavalo', 'OTAVALO'),
        ('Paltas', 'PALTAS'),
        ('Panzaleo', 'PANZALEO'),
        ('Pastos', 'PASTOS'),
        ('Salasaka', 'SALASAKA'),
        ('Saraguro', 'SARAGURO'),
        ('Secoya', 'SECOYA'),
        ('Shuar', 'SHUAR'),
        ('Siona', 'SIONA'),
        ('Tsachila', 'TSACHILA'),
        ('Waorani', 'WAORANI'),
        ('Zapara', 'ZAPARA'),
        ('Otro', 'OTRO'),
    )
    nacionalidad_indigena = models.CharField('Nacionalidad indigena', choices=NACIONALIDAD_INDIGENA, max_length=255, blank=True, null=True)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Dato personal trabajador"
        verbose_name_plural = "Datos personales trabajadores"
        db_table = 'Datos_personales_trabajador'
        ordering = ['id']



class InformacionBancaria(BaseModel):
    institucion_financiera  = models.CharField('Institución financiera', max_length=255, blank= True, null=True)
    TIPO_CUENTA = (
        ('Ahorros', 'AHORROS'),
        ('Corriente', 'CORRIENTE'),
    )
    tipo_cuenta = models.CharField(max_length=255, choices=TIPO_CUENTA, blank=True, null=True, verbose_name='Tipo cuenta bancaria')
    num_cuenta = models.CharField('Número cuenta bancaria', max_length=255, blank= True, null=True)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Información Bancaria"
        verbose_name_plural = "Informacion Bancarias"
        db_table = 'Informacion_bancaria'
        ordering = ['id']