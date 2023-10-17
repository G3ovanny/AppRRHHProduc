from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from core.trabajadores.api.serializers.datosPersonales_serializers import DatosPersonalesSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from core.trabajadores.api.serializers.trabajadores_serializers import CedulaSerializer
from core.trabajadores.models import Trabajador

class DatosFormulario(TokenObtainPairView):
    serializer_class = CedulaSerializer

    def post(self, request, *args, **kwargs):
        #print(request.data.get('numero_identificacion'))
        #print(request.data.get('csrfmiddlewaretoken'))
        cedula = request.data.get('numero_identificacion', '')
        if cedula:
            trabajador = Trabajador.objects.filter(numero_identificacion = cedula)
            if trabajador.exists():
                trabajador_serializer = self.serializer_class(data=request.data)
                if trabajador_serializer.is_valid():
                    return Response({
                        'mensaje': 'Trabajador encontrado'
                    }, status=status.HTTP_200_OK)
            return Response({'error': 'Número de identificación no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Ingrese su número de cédula'}, status=status.HTTP_400_BAD_REQUEST)
    
class Desenlasando(GenericAPIView):
    def post(self, request, *args, **kwargs):
        cedula = Trabajador.objects.filter(numnumero_identificacioner = request.data.get('numero_identificacion', 0))
        if cedula.exists():
            print(cedula)
            return Response({'message':'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe este usuario'}, status=status.HTTP_400_BAD_REQUEST)
        