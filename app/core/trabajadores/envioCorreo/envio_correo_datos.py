from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from core.trabajadores.models import Trabajador
from rest_framework.response import Response
from core.trabajadores.envioCorreo.generarLink import send_link

class EnvioDatos(GenericAPIView):

    def post(self, request):
        trabajador = Trabajador.objects.filter(id=request.data.get('id'))
        if trabajador.exists():
            mensajesError = send_link(trabajador)
            if mensajesError:
            # If there are error messages, return them as a response
                return Response({'mensaje': mensajesError}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'Trabajador encontrado'},status=status.HTTP_200_OK)
        return Response({'error':'No existe este trabajador'}, status=status.HTTP_400_BAD_REQUEST)