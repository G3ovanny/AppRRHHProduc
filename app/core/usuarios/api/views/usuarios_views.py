from datetime import date
from rest_framework import viewsets, status
from rest_framework.decorators import action

from rest_framework.response import Response

from core.usuarios.api.serializers.usuarios_serializers import UsuarioSerializer, UsuarioUpdateSerializer, CustomUserSerializer, UsuarioListSerializer, PasswordSerializer
from core.usuarios.models import Usuario


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = UsuarioSerializer.Meta.model.objects.all()

    def list(self, request, *args, **kwargs):
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

    # ##Canbio de contraseña por usuario
    # @action(detail=True, methods=['post'])
    # def set_pass(self, request, pk=None):
    #     usuario=Usuario.objects.filter(id=pk).first()
    #     password_serialiser = PasswordUserSerializer(data = request.data)
    #     if password_serialiser.is_valid():
    #         usuario_old_password = password_serialiser.validated_data['old_password']
    #         #permite verificar la contraseña antigua
    #         if usuario.check_password(usuario_old_password):
    #             usuario.set_password(password_serialiser.validated_data['password'])
    #         else:
    #             return Response({
    #                 'message': 'El dato ingresado no cincide conla contreseña anterior'
    #             }, status=status.HTTP_400_BAD_REQUEST)
    #         usuario.save()
    #         Usuario.objects.filter(id=pk).update(clave_provicional =  False , fecha_clave =  date.today())
    #         return Response({
    #             'message':'Contraseña actualizada correctamente'
    #         })
    #     return Response({
    #         'message': 'Hay errores en la información enviada',
    #         'errors': password_serialiser.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)


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