from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import NivelOcupacionalSerializer

class NivelOcupacionalViewSet(viewsets.ModelViewSet):
    serializer_class = NivelOcupacionalSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        nivel_serializer = self.serializer_class(data=request.data)
        if nivel_serializer.is_valid():
            nivel_serializer.save()
            return Response({'mensaje':'Nivel ocupacional creado correctamente'}, status=status.HTTP_200_OK)
        return Response(nivel_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            nivel_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if nivel_serializer.is_valid():
                nivel_serializer.save()
                return Response(nivel_serializer.data, status=status.HTTP_200_OK)
            return Response(nivel_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        nivel= self.get_queryset().filter(id=pk).first()
        if nivel:
            #nivel.delete()
            nivel.state = False
            nivel.save()
            return Response({'mensaje': 'Nivel ocupacional eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe el Nivel ocupacional con esos datos'}, status=status.HTTP_400_BAD_REQUEST)