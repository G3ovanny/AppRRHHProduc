from rest_framework import viewsets, status
from rest_framework.response import Response

from core.distributivo.models import Unidad_Organica
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
            codigoUnidad = unidad_serializer.data.get('cod_unidad', '')
            unidadActiva = self.get_queryset().filter(cod_unidad=codigoUnidad).filter(state = True).first()
            unidadNoActiva = Unidad_Organica.objects.filter(cod_unidad=codigoUnidad).filter(state = False).first()
            if unidadNoActiva:
                unidadNoActiva.state = True
                unidadNoActiva.save()
                return Response({'mensaje': f'La unidad organica {unidadNoActiva} se actualizó correctamente'}, status=status.HTTP_200_OK)
            elif unidadNoActiva:
                return Response({'mensaje': f'La unidad organica {unidadActiva} ya contiene el codigo: {codigoUnidad} '}, status=status.HTTP_400_BAD_REQUEST)
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
        unidad = self.get_queryset().filter(id=pk).first()
        if unidad:
            #unidad.delete()
            unidad.state = False
            unidad.save()
            return Response({'mensaje': 'Unidad organica eliminada correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la unidad organica con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
