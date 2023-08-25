from rest_framework import serializers
from ...models import * 

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        exclude= ('state',)

    
    def to_representation(self, instance):
        trabajador = instance.id_trabajador
        if trabajador :
            numero_identificacion = trabajador.numero_identificacion
            nombres = trabajador.nombres
            if trabajador.id_regimen_laboral:
                id_regimen = trabajador.id_regimen_laboral.id
                regimen_laboral = trabajador.id_regimen_laboral.regimen_laboral
            
        else:
            numero_identificacion = ''
            nombres = ''
            id_regimen = ''
            regimen_laboral = ''

        return {
            'id': instance.id,
            'numero_identificacion': numero_identificacion,
            'regimen_laboral': regimen_laboral,
            'nombres': nombres,
            'estado': instance.estado,
            'edificio': instance.edificio,
            'hora': instance.hora,
        }