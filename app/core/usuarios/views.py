from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .api.serializers.usuarios_serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from .models import Usuario

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        usuario = authenticate(
            username = username,
            password = password
        )

        if usuario:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                usuario_serializer = CustomUserSerializer(usuario)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh': login_serializer.validated_data.get('refresh'),
                    'usuario': usuario_serializer.data,
                    'message': 'Inicio de Sesion Existoso'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Usuario o contraseña incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Usuario o contraseña incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class Logout(GenericAPIView):
    def post(self, request, *args, **kwargs):
        usuario = Usuario.objects.filter(id = request.data.get('usuario', 0))
        if usuario.exists():
            RefreshToken.for_user(usuario.first())
            return Response({'message':'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe este usuario'}, status=status.HTTP_400_BAD_REQUEST)