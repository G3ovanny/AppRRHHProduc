from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.serializers import ProcesoSerializer

class ProcesoViewSet(viewsets.ModelViewSet):
    serializer_class = ProcesoSerializer
    
    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        proceso_serializer = self.serializer_class(data = request.data)
        if proceso_serializer.is_valid():
            proceso_serializer.save()
            return Response({'mensaje': 'Proceso creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(proceso_serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk = None):
        if self.get_queryset(pk):
            proceso_serializer = self.serializer_class(self.get_queryset(pk), data =  request.data)
            if proceso_serializer.is_valid():
                proceso_serializer.save()
                return Response(proceso_serializer.data, status=status.HTTP_200_OK)
            return Response(proceso_serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        proceso = self.get_queryset().filter(id = pk).first()
        if proceso:
            #proceso.delete()
            proceso.state = False
            proceso.save()
            return Response({'mensaje': 'Procoeso eliminador correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe el proceso con esos datos'}, status=status.HTTP_400_BAD_REQUEST)