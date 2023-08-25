from ...models import Permiso

from rest_framework import serializers


class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        exclude = ('state',)

    def to_representation(self, instance):

        return {
            'id': instance.id,
            'id_trabajador': instance.id_trabajador.id,
            'numero_identificacion': instance.id_trabajador.numero_identificacion,
            'nombres': instance.id_trabajador.nombres,
            'id_motivo': instance.id_motivo.id,
            'motivo': instance.id_motivo.motivo,
            'detalle': instance.detalle,
            'fecha_hora_salida': instance.fecha_hora_salida,
            'fecha_hora_llegada': instance.fecha_hora_llegada,
            # 'fecha_hora_estimada': instance.fecha_hora_estimada,
            'min_acumulados': instance.min_acumulados,
        }
