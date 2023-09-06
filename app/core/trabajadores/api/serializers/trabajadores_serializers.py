from core.trabajadores.models import Trabajador
from rest_framework import serializers


class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        exclude = ('state',)

    def to_representation(self, instance):
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
            'fecha_ingreso': instance.fecha_ingreso,
            'rmu_puesto': instance.rmu_puesto,
            'partida_individual': instance.partida_individual,
            'correo_institucional': instance.correo_institucional,
            # 'contacto': instance.contacto,
            'id_regimen_laboral': instance.id_regimen_laboral.id,
            'regimen_laboral': instance.id_regimen_laboral.regimen_laboral,
            'id_nivel_ocupacional': instance.id_nivel_ocupacional.id,
            'nivel_ocupacional': instance.id_nivel_ocupacional.nivel_ocupacional,
            'id_modalidad_laboral': instance.id_modalidad_laboral.id,
            'modalidad_laboral': instance.id_modalidad_laboral.modalidad_laboral,
            'id_estructura_programatica': instance.id_estructura_programatica.id,
            'estructura_programatica': instance.id_estructura_programatica.estructura_programatica,

            'id_unidad_organica': instance.id_unidad_organica.id,
            'unidad_organica': instance.id_unidad_organica.unidad_organica,
            'id_denominacion_puesto': instance.id_denominacion_puesto.id,
            'denominacion_puesto': instance.id_denominacion_puesto.denominacion_puesto,
            'dias_vacaciones': instance.dias_vacaciones,
        }
