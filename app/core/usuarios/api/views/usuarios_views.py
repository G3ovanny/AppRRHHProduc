from datetime import date
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from django.contrib.auth.models import User, Group
from core.usuarios.api.serializers.usuarios_serializers import UsuarioSerializer, UsuarioUpdateSerializer, CustomUserSerializer, UsuarioListSerializer, PasswordSerializer
from core.usuarios.models import Usuario
from core.usuarios.permissions import IsInGroupPermission
from core.usuarios.api.serializers.password_serializers import PasswordUserSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all().filter(is_active=True)
    # queryset = UsuarioSerializer.Meta.model.objects.all()

    def list(self, request, *args, **kwargs):
        # group_name = "ADMINISTRADOR"
        
        # # Verifica si el usuario pertenece al grupo antes de permitir el acceso
        # if not request.user.groups.filter(name=group_name).exists():
        #     return Response({"detail": "No tienes permiso para acceder a esta vista."}, status=status.HTTP_403_FORBIDDEN)
        usuarios = Usuario.objects.all().filter(is_active = True)
        usuario_serializer = UsuarioListSerializer(usuarios, many=True)
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)

    # ##cambio contraseña desde RRHH
    # @action(detail=True, methods=['post'])
    # def set_password(self, request , pk=None):
    #     usuario =  Usuario.objects.filter(id=pk).first()
    #     password_serializer = PasswordSerializer(data =  request.data)
    #     if password_serializer.is_valid():
    #         usuario.set_password(password_serializer.validated_data['password'])
    #         usuario.save()
    #         Usuario.objects.filter(id=pk).update(clave_provicional = True , fecha_clave =  date.today())
    #         return Response({'message': 'Contraseña actualizada correctamente'})
    #     return Response ({'message': 'Hay errores en la informacióm enviada',
    #                       'errors': PasswordSerializer.errors
    #                       }, status=status.HTTP_400_BAD_REQUEST)

    ###Cambio de contraseña por usuario
    @action(detail=True, methods=['post'])
    def set_pass(self, request, pk=None):
        usuario=Usuario.objects.filter(id=pk).first()
        password_serialiser = PasswordUserSerializer(data = request.data)
        if password_serialiser.is_valid():
            usuario_old_password = password_serialiser.validated_data['old_password']
            #permite verificar la contraseña antigua
            if usuario.check_password(usuario_old_password):
                usuario.set_password(password_serialiser.validated_data['password'])
                usuario.save()
                Usuario.objects.filter(id=pk).update(clave_temporal=True, fecha_clave=date.today())
                return Response({
                    'message':'Contraseña actualizada correctamente'
                    }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'message': 'La contraseña actual no es la correcta'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            #Usuario.objects.filter(id=pk).update(clave_provicional =  False , fecha_clave =  date.today())
        return Response({
            'message': 'Hay errores en la información enviada',
            'errors': password_serialiser.errors
        }, status=status.HTTP_400_BAD_REQUEST)


    def create(self, request, format=None):
        group_name = "ADMINISTRADOR"
        
        # Verifica si el usuario pertenece al grupo antes de permitir el acceso
        if not request.user.groups.filter(name=group_name).exists():
            return Response({"detail": "No tienes permiso para crear usuarios"}, status=status.HTTP_403_FORBIDDEN)
        
        usuario_serializer = UsuarioSerializer(data=request.data)
        if usuario_serializer.is_valid():
            usuario = usuario_serializer.save()
            tipoUsuario = usuario_serializer.data.get('tipoUsuario')
            group = Group.objects.get(id=tipoUsuario)
            usuario.groups.add(group)
            # group = Group.objects.get(id='ANALISTA')
            return Response({'mensaje': 'El usuario se ha creado correctamente'}, status=status.HTTP_201_CREATED)

        return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, format=None, pk=None):
        group_name = "ADMINISTRADOR"
        # Verifica si el usuario pertenece al grupo antes de permitir el acceso
        if not request.user.groups.filter(name=group_name).exists():
            return Response({"detail": "No tienes permiso para editar usuarios"}, status=status.HTTP_403_FORBIDDEN)
        
        usuario = Usuario.objects.filter(id=pk).first()
        usuario_serializer = UsuarioUpdateSerializer(usuario, data=request.data)
        if usuario_serializer.is_valid():
            group_id = request.data.get('groups')
            groups = Group.objects.filter(id__in=group_id)
            usuario.groups.set(groups)
            usuario_serializer.save()
            return Response({'mensaje': 'Los datos del usuario se han editado correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'Los datos del usuario no se han actualizado'}, status=status.HTTP_304_NOT_MODIFIED)

    def destroy(self, request, pk=None):
        group_name = "ADMINISTRADOR"
        
        # Verifica si el usuario pertenece al grupo antes de permitir el acceso
        if not request.user.groups.filter(name=group_name).exists():
            return Response({"detail": "No tienes permiso para eliminar usuarios"}, status=status.HTTP_403_FORBIDDEN)
        
        usuario = Usuario.objects.filter(id=pk).first()
        if usuario:
            #usuario.delete()
            usuario.is_active = False
            usuario.is_staff=False
            usuario.state = False
            usuario.save()
            return Response({'mensaje': 'Usuario eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe el usuario con esos datos'}, status=status.HTTP_400_BAD_REQUEST)