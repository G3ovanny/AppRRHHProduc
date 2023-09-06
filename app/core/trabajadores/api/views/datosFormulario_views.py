from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from core.trabajadores.api.serializers.datosPersonales_serializers import DatosPersonalesSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class DatosFormulario(TokenObtainPairView):
    serializer_class = DatosPersonalesSerializer

    def post(self, request, *args, **kwargs):
        nombres = request.data.get('nombres', '')
        if nombres:
            datos_serializer = self.serializer_class(data = request.data)
            if datos_serializer.is_valid():
                print(datos_serializer)
                datos_serializer.save()
            return Response({'mensaje': nombres})
        return Response({'mensaje': 'acceso al formulario'})