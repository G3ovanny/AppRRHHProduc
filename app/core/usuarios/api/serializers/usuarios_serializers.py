from datetime import datetime, timedelta
from core.usuarios.models import Usuario
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

#serializador para generar token
class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Usuario
        fields = ('id', 'nombre', 'apellido_paterno', 'correo')

#serializador para listar y crear usuarios
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('is_superuser', 'last_login', 'groups', 'user_permissions')

    #funcion para encriptar contraseñas del usuario a crear
    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario
        
    
    def update(self, instance , validated_data):
        updated_user =  super().update(instance, validated_data)
        updated_user.set_password(validated_data['password'])
        updated_user.save()
        return updated_user

#serializador para cambio de contraseñas
class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password':'Debe ingresar ambas contraseñas iguales'})
        return data

#serializador que permite actualizar un usuario pero no su contraseña
class UsuarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('password')


class UsuarioListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('password', 'is_active', 'last_login', 'is_superuser', 'groups', 'user_permissions' )

class UsuarioLast_logingSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Usuario
        fields = ('id','last_login', 'apellido_paterno', 'nombre')

    def to_representation(self, instance):
        last_login =  instance.last_login,
        if last_login[0] != None:
            hora = last_login[0] - timedelta(hours=5)
        else:
            hora = last_login[0]

        return{
            'id': instance.id,
            'last_login': hora,
            'apellido_paterno': instance.apellido_paterno,
            'nombre': instance.nombre,
        }

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id','username', 'correo', 'nombre', 'apellido_paterno', 'is_staff')
class UsuarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ('password', 'is_staff')