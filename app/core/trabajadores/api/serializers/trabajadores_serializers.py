from core.trabajadores.models import Trabajador
from rest_framework import serializers


class CedulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = ('numero_identificacion',)

class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = '__all__'
        #exclude = ('state',)

    def to_representation(self, instance):
        if instance is None:
            return None 
    
        id_proceso = instance.id_denominacion_puesto.id_proceso

        if id_proceso:
            id_proces = id_proceso.id
            proceso = id_proceso.proceso,
        else:
            id_proces = 'null'
            proceso = 'null'

        return {
            'id': instance.id,
            'tipo_identificacion': instance.tipo_identificacion,
            'numero_identificacion': instance.numero_identificacion,
            'nombres': instance.nombres,
            'celular': instance.celular,
            'correo_personal': instance.correo_personal,
            'fecha_nacimiento': instance.fecha_nacimiento,
            'direccion_domicilio': instance.direccion_domicilio,
            'etnia': instance.etnia,
            'discapacidad': instance.discapacidad,
            'estado_maternidad': instance.estado_maternidad,
            'genero': instance.genero,
            'estado_servidor': instance.estado_servidor,
            
            'fecha_inicio': instance.fecha_inicio,            
            'fecha_fin': instance.fecha_fin,            
            'cod_biometrico': instance.cod_biometrico,
            'rmu_puesto': instance.rmu_puesto,
            'partida_individual': instance.partida_individual,
            'correo_institucional': instance.correo_institucional,
            
            'id_regimen_laboral': instance.id_regimen_laboral.id if instance.id_regimen_laboral else None,
            'regimen_laboral': getattr(instance.id_regimen_laboral, 'regimen_laboral', None),
    
            'id_nivel_ocupacional': instance.id_nivel_ocupacional.id if instance.id_nivel_ocupacional else None,
            'nivel_ocupacional': getattr(instance.id_nivel_ocupacional, 'nivel_ocupacional', None),
    
            'id_modalidad_laboral': instance.id_modalidad_laboral.id if instance.id_modalidad_laboral else None,
            'modalidad_laboral': getattr(instance.id_modalidad_laboral, 'modalidad_laboral', None),
    
            'id_estructura_programatica': instance.id_estructura_programatica.id if instance.id_estructura_programatica else None,
            'estructura_programatica': getattr(instance.id_estructura_programatica, 'estructura_programatica', None),
    
            'id_unidad_organica': instance.id_unidad_organica.id if instance.id_unidad_organica else None,
            'unidad_organica': getattr(instance.id_unidad_organica, 'unidad_organica', None),
    
            'id_denominacion_puesto': instance.id_denominacion_puesto.id if instance.id_denominacion_puesto else None,
            'denominacion_puesto': getattr(instance.id_denominacion_puesto, 'denominacion_puesto', None),
            
            "id_proceso": id_proces,
            "proceso":  proceso,
            'dias_vacaciones': instance.dias_vacaciones,
        }
