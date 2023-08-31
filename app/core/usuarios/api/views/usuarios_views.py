from rest_framework import viewsets, status
from rest_framework.response import Response

from core.usuarios.api.serializers.usuarios_serializers import UsuarioSerializer, UsuarioUpdateSerializer, CustomUserSerializer
from core.usuarios.models import Usuario


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = UsuarioSerializer.Meta.model.objects.all()

    def list(self, request, *args, **kwargs):
        usuarios = Usuario.objects.all().filter(is_active = True)
        usuario_serializer = CustomUserSerializer(usuarios, many=True)
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, format=None):
        usuario_serializer = UsuarioSerializer(data=request.data)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
            return Response({'mensaje': 'El usuario se ha creado correctamente'}, status=status.HTTP_201_CREATED)
    
        return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, format=None, pk=None):
        usuario = Usuario.objects.filter(id=pk).first()
        usuario_serializer = UsuarioUpdateSerializer(usuario, data=request.data)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
            return Response({'mensaje': 'Los datos del usuario se han editado correctamente'}, status=status.HTTP_200_OK)
        
        #return Response({'mensaje': 'Los datos del usuario no se han actualizado'}, status=status.HTTP_304_NOT_MODIFIED)
        
    def destroy(self, request, pk=None):
        usuario = Usuario.objects.filter(id=pk).first()
        usuario.delete()
        return Response({'mensaje': 'El usuario ha sido eliminado correctamente'}, status=status.HTTP_200_OK)