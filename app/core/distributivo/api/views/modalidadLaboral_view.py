from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import ModalidadLaboralSerializer

class ModalidadLaboralViewSet(viewsets.ModelViewSet):
    serializer_class = ModalidadLaboralSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        modalidad_serializer = self.serializer_class(data=request.data)
        if modalidad_serializer.is_valid():
            modalidad_serializer.save()
            return Response({'mensaje':'Modadlidad laboral creado correctamente'}, status=status.HTTP_200_OK)
        return Response(modalidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            modalidad_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if modalidad_serializer.is_valid():
                modalidad_serializer.save()
                return Response(modalidad_serializer.data, status=status.HTTP_200_OK)
            return Response(modalidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        modalidad= self.get_queryset().filter(id=pk).first()
        if modalidad:
            #modalidad.delete()
            modalidad.state = False
            modalidad.save()
            return Response({'mensaje': 'Modadlidad laboral eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la modadlidad laboral con esos datos'}, status=status.HTTP_400_BAD_REQUEST)