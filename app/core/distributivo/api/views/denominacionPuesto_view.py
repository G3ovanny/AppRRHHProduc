from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import DenominacionPuestoSerializer

class DenominacionPuestoViewSet(viewsets.ModelViewSet):
    serializer_class = DenominacionPuestoSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        denominacion_serializer = self.serializer_class(data=request.data)
        if denominacion_serializer.is_valid():
            print(denominacion_serializer)
            #denominacion_serializer.save()
            return Response({'mensaje':'Denominacion del puesto creado correctamente'}, status=status.HTTP_200_OK)
        return Response(denominacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            denominacion_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if denominacion_serializer.is_valid():
                denominacion_serializer.save()
                return Response(denominacion_serializer.data, status=status.HTTP_200_OK)
            return Response(denominacion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        denominacion = self.get_queryset().filter(id=pk).first()
        if denominacion:
            #denominacion.delete()
            denominacion.state = False
            denominacion.save()
            return Response({'mensaje': 'Denominacion del puesto eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la denominacion del puesto con esos datos'}, status=status.HTTP_400_BAD_REQUEST)