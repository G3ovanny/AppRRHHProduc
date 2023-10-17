from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import EstructuraProgramaticaSerializer


class EstructuraViewSet(viewsets.ModelViewSet):
    serializer_class = EstructuraProgramaticaSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def create(self, request):
        estructura_serializer = self.serializer_class(data=request.data)
        if estructura_serializer.is_valid():
            estructura_serializer.save()
            return Response({'mensaje': 'Estructura programática creada correctamente'}, status=status.HTTP_200_OK)
        return Response(estructura_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            estructura_serializer = self.serializer_class(
                self.get_queryset(pk), data=request.data)
            if estructura_serializer.is_valid():
                estructura_serializer.save()
                return Response(estructura_serializer.data, status=status.HTTP_200_OK)
            return Response(estructura_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        estructura = self.get_queryset().filter(id=pk).first()
        if estructura:
            #estructura.delete()
            estructura.state = False
            estructura.save()
            return Response({'mensaje': 'Estructura programática eliminada correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la estructura programática con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
