from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.serializers import AsistenciaSerializer

class AsistenciaViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenciaSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        asistencia_serializer = self.serializer_class(data=request.data)
        if asistencia_serializer.is_valid():
            asistencia_serializer.save()
            return Response({'mensaje':'Asistencia creada correctamente'}, status=status.HTTP_200_OK)
        return Response(asistencia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            asistencia_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if asistencia_serializer.is_valid():
                asistencia_serializer.save()
                return Response(asistencia_serializer.data, status=status.HTTP_200_OK)
            return Response(asistencia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        asistencia = self.get_queryset().filter(id=pk).filter()
        if asistencia:
            asistencia.delete()
            return Response({'mensaje': 'Asistencia eliminada correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la asistencia con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
