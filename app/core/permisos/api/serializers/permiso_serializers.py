from ...models import Permiso

from rest_framework import serializers
from datetime import datetime
from django.db.models import Sum, Count

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'

    def to_representation(self, instance):

        return {
            'id': instance.id,
            'id_trabajador': instance.id_trabajador.id,
            'numero_identificacion': instance.id_trabajador.numero_identificacion,
            'nombres': instance.id_trabajador.nombres,
            'id_motivo': instance.id_motivo.id,
            'motivo': instance.id_motivo.motivo,
            'detalle': instance.detalle,
            'created_date': instance.created_date,
            'fecha_hora_salida': instance.fecha_hora_salida,
            'fecha_hora_llegada': instance.fecha_hora_llegada,
            'horas_almuerzo': instance.horas_almuerzo,
            'otra_hora': instance.otra_hora,
            'certificado_medico': instance.certificado_medico, 
            'min_acumulados': instance.min_acumulados,
        }

class PermisosTrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'
