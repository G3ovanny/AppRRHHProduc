from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers.serializers import RegimenLaboralSerializer

class RegimenViewSet(viewsets.ModelViewSet):
    serializer_class = RegimenLaboralSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        regimen_serializer = self.serializer_class(data=request.data)
        if regimen_serializer.is_valid():
            regimen_serializer.save()
            return Response({'mensaje':'Regimen creado correctamente'}, status=status.HTTP_200_OK)
        return Response(regimen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            regimen_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if regimen_serializer.is_valid():
                regimen_serializer.save()
                return Response(regimen_serializer.data, status=status.HTTP_200_OK)
            return Response(regimen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        regimen = self.get_queryset().filter(id=pk).first()
        if regimen:
            #regimen.delete()
            regimen.state = False
            regimen.save()
            return Response({'mensaje': 'Regimen eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe el regimen con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
