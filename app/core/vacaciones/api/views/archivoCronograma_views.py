from rest_framework import status, viewsets
from rest_framework.response import Response
from core.vacaciones.api.serializers.archivoCronograma_serializers import ArchCronogramaVacacionesSerializer
from core.vacaciones.cargarDocumento.cronogramaVacaciones import cargarCronograma

class ArchCronogramaVacacionesViewSet(viewsets.ModelViewSet):
    serializer_class = ArchCronogramaVacacionesSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all().order_by('id')
        return self.get_queryset().Meta.model.objects.filter(id=pk).first()
    
    def create(self, request):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            response = cargarCronograma()  #Get the error messages
            print(response)
            if 'El documento se ha guardado correctamente' in response:  # Check if 'Success' message is in the list
                return Response({'mensaje': response}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': response}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def update(self, request, pk=None):
    #     archivo = ArchivoTrabajadores.objects.filter(id=pk).first()
    #     archivo_serializer= archivo_serializer(archivo, data=request.data)
    #     if archivo_serializer.is_valid():
    #         archivo_serializer.save()
    #         return Response({'mensaje':'Los datos se han editado correctamente'}, status=status.HTTP_200_OK)
    #     return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def destroy(self, request, pk=None):
    #     archivo = self.get_queryset().filter(id=pk).first()
    #     if archivo:
    #         #archivo.delete()
    #         archivo.state = False
    #         archivo.save()
    #         return Response({'mensaje':'Los datos se han eliminado correctamente'}, status=status.HTTP_200_OK)
    #     return Response({'error':'No existe datos con esas caracteristicas'}, status=status.HTTP_400_BAD_REQUEST)
    