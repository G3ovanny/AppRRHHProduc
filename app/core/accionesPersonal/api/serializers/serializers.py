from rest_framework import serializers
from ...models import *


class AccionPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccionPersonal
        exclude = ('state',)

    def to_representation(self, instance):
        if instance.id_trabajador:
            nombres = instance.id_trabajador.nombres
            palabras = nombres.split()
            palabras_a_ignorar = ["DEL", "DE LOS ", "DE LAS ", "DE LA "]
            # Eliminar la palabra "DEL" si está presente y concatenarla a la palabra siguiente
            for palabra in palabras_a_ignorar:
                if palabra in palabras:
                    indice_del = palabras.index(palabra)
                    if indice_del < len(palabras) - 1:
                        palabras[indice_del + 1] = palabra+ ' ' + palabras[indice_del + 1]
                    palabras.remove(palabra)
            
            # Identificar los apellidos y nombres
            if len(palabras) >= 3:
                apellido_paterno = palabras[0]
                apellido_materno = palabras[1]
                nombres = " ".join(palabras[2:])
                # return {"apellido_paterno": apellido_paterno, "apellido_materno": apellido_materno, "nombres": nombres}
            elif len(palabras) == 2:
                apellido_paterno = palabras[0]
                apellido_materno= ''
                nombres = palabras[1]
                # return {"apellido_paterno": apellido_paterno, "apellido_materno": apellido_materno, "nombres": nombres}
        # if instance.id_trabajador:
        #     nombres = instance.id_trabajador.nombres

        #     palabras = nombres.split(' ')
        #     nomb = ' '.join(palabras[-2:])
            #apellido_materno = ''.join(palabras[-3])
            #apellido_paterno = ''.join(palabras[-4])
        
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
            'nombres': nombres,
            'apellido_paterno': apellido_paterno,
            'apellido_materno': apellido_materno,
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
