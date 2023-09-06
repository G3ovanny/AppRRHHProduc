from rest_framework import serializers

from ...models import *


class RegimenLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Regimen_Laboral
        exclude = ('state',)


class NivelOcupacionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel_Ocupacional
        exclude = ('state',)


class ModalidadLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidad_Laboral
        exclude = ('state',)


class UnidadOrganicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad_Organica
        exclude = ('state',)


class DenominacionPuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Denominacion_Puesto
        exclude = ('state',)


class EstructuraProgramaticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estructura_Programatica
        exclude = ('state',)

class ProcesoSerializer(serializers.ModelSerializer):
    class Meta :
        model = Proceso
        exclude = ('state',)