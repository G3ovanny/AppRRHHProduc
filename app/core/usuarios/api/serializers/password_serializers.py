from rest_framework import serializers


#seriaizador para el cambio de contraseña
class PasswordUserSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, min_length=1, write_only=True)
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password':'Debe ingresar ambas contraseñas iguales'})
        return data
    
class ResetPasswordUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)

    class Meta:
        fields = ['username', ]