from rest_framework import serializers

from ...models import MotivoPermiso

class MotivoPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotivoPermiso
        fields = '__all__'