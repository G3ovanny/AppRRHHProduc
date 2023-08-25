from ...models import ArchivoAcciones
from rest_framework import serializers


class ArchivoAccionesSerializers(serializers.ModelSerializer):
    class Meta:
        model = ArchivoAcciones
        exclude = ('state',)
