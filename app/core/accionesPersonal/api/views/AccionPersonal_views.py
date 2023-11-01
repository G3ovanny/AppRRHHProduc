from rest_framework import viewsets, status
from rest_framework.response import Response
from core.trabajadores.models import Trabajador
from core.distributivo.models import Unidad_Organica
from core.distributivo.models import Denominacion_Puesto, Estructura_Programatica
from ..serializers.serializers import AccionPersonalSerializer
from ...models import AccionPersonal
class AccionPersonalViewSet(viewsets.ModelViewSet):
    serializer_class = AccionPersonalSerializer

    def get_queryset(self, pk= None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True, id_trabajador__state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state= True, id_trabajador__state=True).first()
    
    def create(self, request):
        accion_serializer = self.serializer_class(data = request.data)
        accion_anterior = AccionPersonal.objects.all()
        if accion_serializer.is_valid():
            count = accion_serializer.validated_data.get('contador')
            accion_trabajador = accion_serializer.validated_data.get('id_trabajador')
            id_trabaAccion = accion_trabajador.id
            #//// las siguientes condicionales me permite cambiar los datos al servidor de la accion de personal
            if id_trabaAccion :
                trabajador = Trabajador.objects.all().filter( state = True, id= id_trabaAccion, ).first()
                if accion_serializer.validated_data.get('partida_propuesta'):
                    partida_propuesta = accion_serializer.validated_data.get('partida_propuesta')
                    trabajador.partida_individual = partida_propuesta

                if accion_serializer.validated_data.get('subproceso_propuesta'):
                    subproceso_propuesta = accion_serializer.validated_data.get('subproceso_propuesta')
                    id_unidad = Unidad_Organica.objects.all().filter(id = subproceso_propuesta).first()
                    trabajador.id_unidad_organica = id_unidad

                if accion_serializer.validated_data.get('puesto_propuesta'):
                    puesto_propuesta= accion_serializer.validated_data.get('puesto_propuesta')
                    id_denominacion = Denominacion_Puesto.objects.all().filter(id=puesto_propuesta).first()
                    trabajador.id_denominacion_puesto = id_denominacion

                if accion_serializer.validated_data.get('rmu_propuesta'):
                    rmu_propuesta = accion_serializer.validated_data.get('rmu_propuesta')
                    trabajador.rmu_puesto = rmu_propuesta

                if accion_serializer.validated_data.get('estructura_propuesta'):
                    estructura_propuesta = accion_serializer.validated_data.get('estructura_propuesta')
                    id_estructura = Estructura_Programatica.objects.all().filter(id=estructura_propuesta).first()
                    trabajador.id_estructura_programatica = id_estructura

                trabajador.save()

            if count:
                accion_serializer.save()
            else:
                if accion_anterior:
                    ultima_accion = accion_anterior.latest('id')
                    conta = ultima_accion.contador
                    accion_serializer.save(contador = conta + 1)
                else:
                    accion_serializer.save()
           
            return Response({'mensaje': 'Acción de personal creada correctamente'}, status= status.HTTP_200_OK)
        return Response(accion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk = None):
        if self.get_queryset(pk):
            accion_serializer = self.serializer_class(self.get_queryset(pk), data = request.data)
            if accion_serializer.is_valid():
                accion_serializer.save()
                return Response(accion_serializer.data, status=status.HTTP_200_OK)
        return Response(accion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk= None):
        accion = self.get_queryset().filter(id=pk).first()
        if accion:
            acciones = AccionPersonal.objects.all().filter(id__gt=pk).filter(state= True).filter(estado_accion='VIGENTE')
            for acc in acciones:
                id_accion = acc.id
                contador = acc.contador -1
                AccionPersonal.objects.all().filter(id=id_accion, state= True).update(contador=contador)
                #print(contador)
            #accion.delete()
            accion.estado_accion = 'ANULADO'
            accion.state = False
            accion.save()
            return Response({'mensaje': 'Acción de personal eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe acción de personal con esos datos'})