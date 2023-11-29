from rest_framework import viewsets, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from ..serializers.serializers import AsistenciaSerializer
from datetime import datetime, timedelta

# class AsistenciaPagination(pagination.PageNumberPagination) :
#     page_size = 100
#     page_size_query_param = 'page_size'
#     max_page_size = 1000


class AsistenciaViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenciaSerializer
    #pagination_class = AsistenciaPagination

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'fecha_registro': ['gte', 'lte'],
    }


    def get_queryset(self, pk=None):
        today = datetime.now().date()
        yesterday = today - timedelta(days=1)

        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True, id_trabajador__state=True, fecha_registro__date=yesterday )
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True, id_trabajador__state=True, fecha_registro__date=yesterday ).first()

    # def get_queryset(self, pk=None):
    #     if pk is None:
    #         return self.get_serializer().Meta.model.objects.filter(state = True, id_trabajador__state=True)
    #     return self.get_serializer().Meta.model.objects.filter(id=pk, state = True, id_trabajador__state=True).first()
    
    def create(self, request):
        asistencia_serializer = self.serializer_class(data=request.data)
        if asistencia_serializer.is_valid():
            asistencia_serializer.save()
            return Response({'mensaje':'Asistencia creada correctamente'}, status=status.HTTP_200_OK)
        return Response(asistencia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            asistencia_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)
            if asistencia_serializer.is_valid():
                asistencia_serializer.save()
                return Response(asistencia_serializer.data, status=status.HTTP_200_OK)
            return Response(asistencia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        asistencia = self.get_queryset().all()
        
        asistencia.delete()
        # asistencia = self.get_queryset().filter(id=pk).first()
        # if asistencia:
        #     # asistencia.delete()
        #     # asistencia.state = False
        #     # asistencia.save()
        #     return Response({'mensaje': 'Asistencia eliminada correctamente'}, status= status.HTTP_200_OK)
        return Response({'mensaje': 'No existe la asistencia con esos datos'}, status=status.HTTP_400_BAD_REQUEST)
