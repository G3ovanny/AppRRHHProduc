from dateutil.relativedelta import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.cronograma_serializers import CronogramaVacacionesSerializer
from ...models import CronogramaVacaciones

from ....trabajadores.models import Trabajador


class CronogramaVacacionesViewSet(viewsets.ModelViewSet):
    serializer_class = CronogramaVacacionesSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True, id_trabajador__state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True, id_trabajador__state=True).first()

    def create(self, request):
        cronograma_serializer = self.serializer_class(data=request.data)
        if cronograma_serializer.is_valid():
            trabajador = cronograma_serializer.validated_data.get(
                'id_trabajador')
            id_trabajador = trabajador.id
            fecha_desde = cronograma_serializer.validated_data.get(
                'fecha_inicio')
            fecha_fin = cronograma_serializer.validated_data.get('fecha_fin')

            tiempo = relativedelta(fecha_fin, fecha_desde)
            meses_t = (tiempo.months*30)
            dias_t = (meses_t + tiempo.days)+1
            min_dia = (dias_t * 8) * 60
            if fecha_desde and fecha_fin:
                cronograma_serializer.save(min_acumulados=min_dia)
                # se restan los minutos al servidor al que sale de vacaciones
                dias = Trabajador.objects.filter(
                    id=id_trabajador).values_list('dias_vacaciones', flat=True)
                dia = dias[0]
                resta_dias = dia - dias_t
                Trabajador.objects.filter(id=id_trabajador).update(
                    dias_vacaciones=resta_dias)
            else:
                cronograma_serializer.save(min_acumulados=0)
            # cronograma_serializer.save()
            return Response({'mensaje': 'Los datos se han creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(cronograma_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            cronograma_serializer = self.serializer_class(
                self.get_queryset(pk), data=request.data)
            if cronograma_serializer.is_valid():
                trabajador = cronograma_serializer.validated_data.get(
                    'id_trabajador')
                id_trabajador = trabajador.id
                fecha_desde = cronograma_serializer._validated_data.get(
                    'fecha_inicio')
                fecha_hasta = cronograma_serializer.validated_data.get(
                    'fecha_fin')
                tiempo = relativedelta(fecha_hasta, fecha_desde)
                meses_t = (tiempo.months*30)
                dias_t = (meses_t + tiempo.days)+1
                min_t = (dias_t*480)

                min_acumulados = cronograma_serializer.validated_data.get(
                    'min_acumulados')
                dias_vacaciones = Trabajador.objects.filter(
                    id=id_trabajador).values_list('dias_vacaciones', flat=True)

                vacaciones = ((dias_vacaciones[0])*8)*60
                suma = min_acumulados + vacaciones
                dias_suma = suma / 480
                suma_dias = dias_suma - dias_t
                Trabajador.objects.filter(id=id_trabajador).update(
                    dias_vacaciones=suma_dias)

                cronograma_serializer.save(min_acumulados=min_t)
                return Response(cronograma_serializer.data, status=status.HTTP_200_OK)
        return Response(cronograma_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        cronograma = self.get_queryset().filter(id=pk).first()
        if cronograma:
            id_trabajador = cronograma.id_trabajador.id
            min_acumulados = cronograma.min_acumulados
            vacaciones_trab = Trabajador.objects.filter(
                id=id_trabajador).values_list('dias_vacaciones', flat=True)
            dias_vacaciones = ((vacaciones_trab[0])*8)*60
            suma = dias_vacaciones + min_acumulados
            suma_dias = ((suma)/60)/8
            Trabajador.objects.filter(id=id_trabajador).update(
                dias_vacaciones=suma_dias)
            #cronograma.delete()
            cronograma.state = False
            cronograma.save()
            return Response({'mensaje': 'Los datos se han eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe datos con esas caracteristicas'}, status=status.HTTP_400_BAD_REQUEST)
