from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.datosPersonales_serializers import DatosPersonalesSerializer

class DatosTrabajadoresViewSet(viewsets.ModelViewSet):
    serializer_class =  DatosPersonalesSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        datosTrabajador_serializer = self.serializer_class(data=request.data)
        if datosTrabajador_serializer.is_valid():
            datosTrabajador_serializer.save()
            return Response({'mensaje':'Los datos se han creado correctamente'}, status=status.HTTP_200_OK)
        return Response(datosTrabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            datosTrabajador_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if datosTrabajador_serializer.is_valid():
                datosTrabajador_serializer.save()
                return Response(datosTrabajador_serializer.data, status=status.HTTP_200_OK)
            return Response(datosTrabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        datosTrabajador = self.get_queryset().filter(id=pk).filter()
        if datosTrabajador:
            datosTrabajador.delete()
            return Response({'mensaje': 'Los datos se han eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe información con esos datos'}, status=status.HTTP_400_BAD_REQUEST)