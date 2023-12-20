from core.vacaciones.models import ArchivoCronograma
from rest_framework import serializers


class ArchCronogramaVacacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivoCronograma
        exclude = ('state',)