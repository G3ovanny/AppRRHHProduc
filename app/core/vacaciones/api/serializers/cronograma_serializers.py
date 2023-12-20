from rest_framework import serializers
from ...models import CronogramaVacaciones


class CronogramaVacacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CronogramaVacaciones
        exclude = ('state',)

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'fecha_solicitud': instance.fecha_solicitud,
            'fecha_inicio': instance.fecha_inicio,
            'fecha_fin': instance.fecha_fin,
            'min_acumulados': instance.min_acumulados,
            'explicacion': instance.explicacion,
            'estado_accion': instance.estado_accion,
            'created_date': instance.created_date,
            'id_trabajador': instance.id_trabajador.id,
            'numero_identificacion': instance.id_trabajador.numero_identificacion,
            'nombres': instance.id_trabajador.nombres,
            'id_unidad_organica': instance.id_trabajador.id_unidad_organica.id,
            'unidad_organica': instance.id_trabajador.id_unidad_organica.unidad_organica,
            'id_regimen_laboral': instance.id_trabajador.id_regimen_laboral.id,
            'regimen_laboral': instance.id_trabajador.id_regimen_laboral.regimen_laboral,
            'id_denominacion_puesto': instance.id_trabajador.id_denominacion_puesto.id,
            'denominacion_puesto': instance.id_trabajador.id_denominacion_puesto.denominacion_puesto,
        }
