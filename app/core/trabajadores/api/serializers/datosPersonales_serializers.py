from ...models import DatosPersonalesTrabajadores
from rest_framework import serializers



class DatosPersonalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosPersonalesTrabajadores
        exclude =  ('state',)

    