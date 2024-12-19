from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import EscalaOcupacionalSerializer




class EscalaOcupacionalViewSet(viewsets.ModelViewSet):
    serializer_class = EscalaOcupacionalSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def create(self, request):
        escalaOcupacional_serializer = self.serializer_class(data=request.data)
        if escalaOcupacional_serializer.is_valid():
            escalaOcupacional_serializer.save()
            return Response({'mensaje': 'Escala Ocupacional creada correctamente'}, status=status.HTTP_200_OK)
        return Response(escalaOcupacional_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            escalaOcupacional_serializer = self.serializer_class(
                self.get_queryset(pk), data=request.data)
            if escalaOcupacional_serializer.is_valid():
                escalaOcupacional_serializer.save()
                return Response(escalaOcupacional_serializer.data, status=status.HTTP_200_OK)
            return Response(escalaOcupacional_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        escalaOcupacional = self.get_queryset().filter(id=pk).first()
        if escalaOcupacional:
            #escalaOcupacional.delete()
            escalaOcupacional.state = False
            escalaOcupacional.save()
            return Response({'mensaje': 'Escala Ocupacional eliminada correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la Escala Ocupacional con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
