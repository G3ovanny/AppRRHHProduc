from rest_framework import viewsets, status
from rest_framework.response import Response
from ..serializers.serializers import AccionPersonalSerializer
from ...models import AccionPersonal
class AccionPersonalViewSet(viewsets.ModelViewSet):
    serializer_class = AccionPersonalSerializer

    def get_queryset(self, pk= None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state = True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state= True).first()
    
    def create(self, request):
        accion_serializer = self.serializer_class(data = request.data)
        accion_anterior = AccionPersonal.objects.all()
        if accion_serializer.is_valid():
            count = accion_serializer.validated_data.get('contador')
            if count:
                accion_serializer.save()
            else:
                if accion_anterior:
                    ultima_accion = accion_anterior.latest('id')
                    contador = ultima_accion.contador
                    accion_serializer.save(contador= contador + 1)
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
            acciones = AccionPersonal.objects.all().filter(id__gt=pk).filter(estado_accion='VIGENTE')
            for acc in acciones:
                id_accion = acc.id
                contador = acc.contador -1
                AccionPersonal.objects.all().filter(id=id_accion, state= True).update(contador=contador)
                #print(contador)
            accion.delete()
            return Response({'mensaje': 'Acción de personal eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'No existe acción de personal con esos datos'})