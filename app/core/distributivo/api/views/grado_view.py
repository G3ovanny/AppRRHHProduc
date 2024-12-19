from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.serializers import GradoSerializer



class GradoViewSet(viewsets.ModelViewSet):
    serializer_class = GradoSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def create(self, request):
        grado_serializer = self.serializer_class(data=request.data)
        if grado_serializer.is_valid():
            grado_serializer.save()
            return Response({'mensaje': 'Grado creado correctamente'}, status=status.HTTP_200_OK)
        return Response(grado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            grado_serializer = self.serializer_class(
                self.get_queryset(pk), data=request.data)
            if grado_serializer.is_valid():
                grado_serializer.save()
                return Response(grado_serializer.data, status=status.HTTP_200_OK)
            return Response(grado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        grado = self.get_queryset().filter(id=pk).first()
        if grado:
            #grado.delete()
            grado.state = False
            grado.save()
            return Response({'mensaje': 'Grado eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la grado con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
