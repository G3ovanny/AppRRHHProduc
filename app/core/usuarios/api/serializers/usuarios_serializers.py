from core.usuarios.models import Usuario
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id','username', 'correo', 'nombre', 'apellido_paterno', 'is_staff')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('is_superuser', 'last_login', 'groups', 'user_permissions')


class UsuarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('password', 'is_staff')