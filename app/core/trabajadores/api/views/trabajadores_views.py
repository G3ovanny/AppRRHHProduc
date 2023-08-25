from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.trabajadores_serializers import TrabajadorSerializer

 
class TrabajadorViewSet(viewsets.ModelViewSet):
    serializer_class = TrabajadorSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state = True).first()
    
    def create(self, request):
        trabajador_serializer = self.serializer_class(data=request.data)
        if trabajador_serializer.is_valid():
            trabajador_serializer.save()
            return Response({'mensaje':'Trabajador creado correctamente'}, status=status.HTTP_200_OK)
        return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            trabajador_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if trabajador_serializer.is_valid():
                trabajador_serializer.save()
                return Response(trabajador_serializer.data, status=status.HTTP_200_OK)
            return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        trabajador = self.get_queryset().filter(id=pk).filter()
        if trabajador:
            trabajador.delete()
            return Response({'mensaje': 'Trabajador eliminado correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe el trabajador con esos datos'}, status=status.HTTP_400_BAD_REQUEST)