from rest_framework import serializers

from ...models import *


class RegimenLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Regimen_Laboral
        fields = '__all__'


class NivelOcupacionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel_Ocupacional
        fields = '__all__'


class ModalidadLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidad_Laboral
        fields = '__all__'


class UnidadOrganicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad_Organica
        fields = '__all__'
        #fields = '__all__'


class DenominacionPuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Denominacion_Puesto
        fields = '__all__'

    def to_representation(self, instance):
        id_proceso = instance.id_proceso
        
        if id_proceso:
            id_proces = id_proceso.id
            proceso = id_proceso.proceso,
        else:
            id_proces = 'null'
            proceso = 'null'
        return {
            "id": instance.id,
            "cod_denominacion_puesto":instance.cod_denominacion_puesto,
            "denominacion_puesto":instance.denominacion_puesto,
            "id_proceso": id_proces,
            "proceso":  proceso,
        }


class EstructuraProgramaticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estructura_Programatica
        fields = '__all__'

class ProcesoSerializer(serializers.ModelSerializer):
    class Meta :
        model = Proceso
        fields = '__all__'