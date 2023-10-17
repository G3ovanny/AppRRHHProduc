from dateutil.relativedelta import *
import django.db
from rest_framework import status, viewsets
from rest_framework.response import Response
from ..serializers.permiso_serializers import PermisoSerializer


from core.trabajadores.models import Trabajador
from ...models import MotivoPermiso


class PermisoViewSet(viewsets.ModelViewSet):
    serializer_class = PermisoSerializer
 
    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True, id_trabajador__state=True)
        return self.get_queryset().Meta.model.objects.filter(id=pk, state=True, id_trabajador__state=True).first()
    
    def create(self, request):
        permiso_serializer = self.serializer_class(data= request.data)
        if permiso_serializer.is_valid():
            id_trabajador = permiso_serializer.validated_data.get('id_trabajador')
            id_motivo = permiso_serializer.validated_data.get('id_motivo')
            hora_salida = permiso_serializer.validated_data.get('fecha_hora_salida')
            hora_llegada = permiso_serializer.validated_data.get('fecha_hora_llegada')
            h_almuerzo = permiso_serializer.validated_data.get('horas_almuerzo')
            otra_hora = permiso_serializer.validated_data.get('otra_hora')
            motivo = MotivoPermiso.objects.filter(motivo='Con cargo a vacaciones').get()
            #tiempo= hora_llegada - hora_salida
            
            tiempo_almuerzo = 2 * 60
            tiempo = relativedelta(hora_llegada, hora_salida) # resta las horas de llegada - la salida
            dias = (tiempo.days) * 8 # obtengo los dias y los multiplico por 8 horas diarias de trabajo 
            dias_minutos=(dias) * 60    # combierto los dias en minutos
            horas = (tiempo.hours) * 60 # combierto las horas en minutos
            minutos = tiempo.minutes    # obtengo los minutos de la resta de horas de llegada y salida
            
            if h_almuerzo =='otro':
                otrah_horas = (otra_hora.hour)
                otrah_minutos = otra_hora.minute
                t_almuerzo= otrah_horas + otrah_minutos

                hora = horas - t_almuerzo
                suma = dias_minutos + hora + minutos
            elif h_almuerzo == 'restar_dos':
                hora = horas - tiempo_almuerzo
                suma = dias_minutos + hora + minutos
            else:
                suma = dias_minutos + horas + minutos

            if hora_llegada != 'None':
                permiso_serializer.save(min_acumulados=suma)
                if motivo == id_motivo:
                    dias_vacaciones = Trabajador.objects.filter(nombres=id_trabajador).values_list('dias_vacaciones', flat=True)
                    dia_vacaciones = ((dias_vacaciones[0]) * 8) *60
                    resta = dia_vacaciones - suma
                    resta_dias = ((resta) / 60) / 8
                    Trabajador.objects.filter(nombres=id_trabajador).update(dias_vacaciones=resta_dias)
                else:
                    pass
            else:
                permiso_serializer.save(min_acumulados=0)

            return Response({'mensaje':'Permiso creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(permiso_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, ):
        permiso = self.get_queryset().filter(id=pk).first()
        minutos = permiso.min_acumulados
        if permiso:
            permiso_serializer = self.serializer_class(permiso, data=request.data)
            if permiso_serializer.is_valid():
                # se verifica los datos que se van a guardar
                id_trabajador = permiso_serializer.validated_data.get('id_trabajador')
                id_motivo = permiso_serializer.validated_data.get('id_motivo')
                hora_llegada = permiso_serializer.validated_data.get('fecha_hora_llegada')
                hora_salida = permiso_serializer.validated_data.get('fecha_hora_salida')
                motivo = MotivoPermiso.objects.filter(motivo='Con cargo a vacaciones').get()
                
                h_almuerzo = permiso_serializer.validated_data.get('horas_almuerzo')
                otra_hora = permiso_serializer.validated_data.get('otra_hora')

                tiempo_almuerzo = 2 * 60
                tiempo = relativedelta(hora_llegada, hora_salida) #resta las horas de llegada - la salida
                dias = (tiempo.days) * 8    # obtengo los dias y los multiplico por 8 horas diarias de trabajo
                dias_minutos=(dias) * 60    # combierto los dias en minutos
                horas = (tiempo.hours) * 60 # combierto las horas en minutos
                minutos = tiempo.minutes    # obtengo los minutos de la resta de horas de llegada y salida
                
                if h_almuerzo =='otro':
                    otrah_horas = (otra_hora.hour)
                    otrah_minutos = otra_hora.minute
                    t_almuerzo= otrah_horas + otrah_minutos  
                    hora = horas - t_almuerzo
                    suma = dias_minutos + hora + minutos
                elif h_almuerzo == 'restar_dos':
                    hora = (horas-tiempo_almuerzo)
                    suma = dias_minutos + hora + minutos
                else:
                    suma = dias_minutos + horas + minutos 
                
                min_acumulados = permiso_serializer.validated_data.get('min_acumulados')

                if id_motivo == motivo:
                    dias_vacaciones = Trabajador.objects.filter(nombres=id_trabajador).values_list('dias_vacaciones', flat=True)
                    dia_vacaciones = ((dias_vacaciones[0]) * 8) *60
                    suma_min = min_acumulados + dia_vacaciones # sumo los minutos que se quita al crear
                    mi_acum = suma_min - suma
                    suma_dias = ((mi_acum) / 60) / 8
                    Trabajador.objects.filter(nombres=id_trabajador).update(dias_vacaciones=suma_dias) 
                
                permiso_serializer.save(min_acumulados= suma )

                return Response(permiso_serializer.data, status=status.HTTP_200_OK)
        return Response(permiso_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def destroy(self, request, pk=None):
        permiso = self.get_queryset().filter(id=pk).first()
        motivo = permiso.id_motivo.motivo
        
        if permiso:
            if motivo == 'Con cargo a vacaciones':
                id_trabajador = permiso.id_trabajador
                min_acumulados = permiso.min_acumulados
                dias_vacaciones = Trabajador.objects.filter(nombres=id_trabajador).values_list('dias_vacaciones', flat=True)
                dia_vacaciones = ((dias_vacaciones[0]) * 8) *60
                
                suma = dia_vacaciones + min_acumulados
                suma_dias = ((suma) / 60) / 8
                Trabajador.objects.filter(nombres=id_trabajador).update(dias_vacaciones=suma_dias)

            #permiso.delete()
            permiso.state = False
            permiso.save()
            return Response({'mensaje':'Permiso eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe el permiso con esos datos'}, status=status.HTTP_400_BAD_REQUEST)

