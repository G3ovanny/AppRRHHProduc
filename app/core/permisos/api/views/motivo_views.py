from rest_framework import status, viewsets
from rest_framework.response import Response

from ...api.serializers.motivo_serializers import MotivoPermisoSerializer

class MotivoPermisoViewSet(viewsets.ModelViewSet):
    serializer_class = MotivoPermisoSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        motivo_serializer = self.serializer_class(data = request.data)
        if motivo_serializer.is_valid():
            motivo_serializer.save()
            return Response({'mensaje':'El motido de permiso se creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(motivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk =None):
        if self.get_queryset(pk):
            motivo_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if motivo_serializer.is_valid():
                motivo_serializer.save()
                return Response(motivo_serializer.data, status=status.HTTP_200_OK)
        return Response(motivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        motivo= self.get_queryset().filter(id=pk)
        if motivo:
            #motivo.delete()
            motivo.state = False
            motivo.save()
            return Response({'mensaje':'El motivo del permiso eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No exite el motivo de permiso con esos datos'}, status=status.HTTP_400_BAD_REQUEST)