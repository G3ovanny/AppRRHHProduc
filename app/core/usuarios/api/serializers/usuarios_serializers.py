from core.usuarios.models import Usuario
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('username', 'correo', 'nombre', 'apellido_paterno')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('is_superuser', 'is_staff', 'last_login', 'groups', 'user_permissions')
        #fields = ("__all__")


class UsuarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('password', 'is_staff')