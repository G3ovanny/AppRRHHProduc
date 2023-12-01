from rest_framework import serializers
from ...models import *


class AccionPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccionPersonal
        exclude = ('state',)

    def to_representation(self, instance):
        if instance.id_trabajador:
            nombres = instance.id_trabajador.nombres
            palabras = nombres.split(' ')
            nomb = ' '.join(palabras[-2:])
            ap2 = ''.join(palabras[-3])
            ap1 = ''.join(palabras[-4])
        
        proceso_propuesta =  instance.proceso_propuesta,
        subproceso_propuesta =  instance.subproceso_propuesta,
        puesto_propuesta =  instance.puesto_propuesta,
        rmu_propuesta =  instance.rmu_propuesta,
        estructura_propuesta =  instance.estructura_propuesta,
        partida_propuesta =  instance.partida_propuesta,

        return {
            'id': instance.id,
            'id_trabajador': instance.id_trabajador.id,
            'numero_identidad': instance.id_trabajador.numero_identificacion,
            'nombres': nomb,
            'apellido_paterno': ap1,
            'apellido_materno': ap2,
            'contador': instance.contador,
            'fecha_accion': instance.fecha_accion,
            'fecha_rigue': instance.fecha_rigue,
            'explicacion': instance.explicacion,
            'tipo_accion': instance.tipo_accion,
            'estado_accion': instance.estado_accion,
            'otro_tipo': instance.otro_tipo,
            'doc_base': instance.doc_base,
            'num_doc': instance.num_doc,
            'fecha_doc': instance.fecha_doc,


            'proceso_actual': instance.proceso_actual,
            'subproceso_actual': instance.subproceso_actual,
            'puesto_actual': instance.puesto_actual,
            'rmu_actual': instance.rmu_actual,
            'estructura_actual': instance.estructura_actual,
            'partida_actual': instance.partida_actual,

            'proceso_propuesta': instance.proceso_propuesta,
            'subproceso_propuesta': instance.subproceso_propuesta,
            'puesto_propuesta': instance.puesto_propuesta,
            'rmu_propuesta': instance.rmu_propuesta,
            'estructura_propuesta': instance.estructura_propuesta,
            'partida_propuesta': instance.partida_propuesta,

            'created_date': instance.created_date,
        }
