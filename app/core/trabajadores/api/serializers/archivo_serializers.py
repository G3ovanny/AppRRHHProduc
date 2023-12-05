from core.trabajadores.models import ArchivoTrabajadores
from rest_framework import serializers
from core.trabajadores.models import CorreoTrabajadores
from core.trabajadores.models import VacacionesTrabajadores

class ArchTrabajadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model= ArchivoTrabajadores
        exclude = ('state',)

class CorreoTrabajadoresSeializer(serializers.ModelSerializer):
    doc = serializers.FileField(max_length=5242880)
    class Meta:
        model =  CorreoTrabajadores
        exclude = ('state',)

class VacacionesTrabajadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacacionesTrabajadores
        exclude = ('state',)