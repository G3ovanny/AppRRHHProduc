from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import UnidadOrganicaSerializer

class UnidadOrganicaViewSet(viewsets.ModelViewSet):
    serializer_class = UnidadOrganicaSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        unidad_serializer = self.serializer_class(data=request.data)
        if unidad_serializer.is_valid():
            unidad_serializer.save()
            return Response({'mensaje':'Unidad organica creada correctamente'}, status=status.HTTP_200_OK)
        return Response(unidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            unidad_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if unidad_serializer.is_valid():
                unidad_serializer.save()
                return Response(unidad_serializer.data, status=status.HTTP_200_OK)
            return Response(unidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        unidad = self.get_queryset().filter(id=pk).filter()
        if unidad:
            unidad.delete()
            return Response({'mensaje': 'Unidad organica eliminada correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la unidad organica con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
