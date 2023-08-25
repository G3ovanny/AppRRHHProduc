from core.trabajadores.models import ArchivoTrabajadores
from rest_framework import serializers

class ArchTrabajadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model= ArchivoTrabajadores
        exclude = ('state',)