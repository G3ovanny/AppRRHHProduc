from rest_framework import status, viewsets
from rest_framework.response import Response
from core.trabajadores.api.serializers.archivo_serializers import ArchTrabajadoresSerializer, CorreoTrabajadoresSeializer, VacacionesTrabajadoresSerializer

from core.trabajadores.cargarDocumentos.correo import analisis_correos

from core.trabajadores.cargarDocumentos.vacaciones import analisis_vacaciones
from ...models import ArchivoTrabajadores, CorreoTrabajadores, VacacionesTrabajadores

from ...views import *


class ArchTrabajadoresViewSet(viewsets.ModelViewSet):
    serializer_class = ArchTrabajadoresSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all().order_by('id')
        return self.get_queryset().Meta.model.objects.filter(id=pk).first()
    
    def create(self, request):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            error_messages = analisis_trabajadores()  # Get the error messages
            if error_messages:
            # If there are error messages, return them as a response
                return Response({'mensaje': error_messages}, status=status.HTTP_400_BAD_REQUEST)
            else:
            # If no errors, return a success response
                return Response({'mensaje': 'Los datos se han creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        archivo = ArchivoTrabajadores.objects.filter(id=pk).first()
        archivo_serializer= archivo_serializer(archivo, data=request.data)
        if archivo_serializer.is_valid():
            archivo_serializer.save()
            return Response({'mensaje':'Los datos se han editado correctamente'}, status=status.HTTP_200_OK)
        return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        archivo = self.get_queryset().filter(id=pk).first()
        if archivo:
            #archivo.delete()
            archivo.state = False
            archivo.save()
            return Response({'mensaje':'Los datos se han eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe datos con esas caracteristicas'}, status=status.HTTP_400_BAD_REQUEST)
    

class CorreosTrabajadoresViewSet(viewsets.ModelViewSet):
    serializer_class = CorreoTrabajadoresSeializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all().order_by('id')
        return self.get_queryset().Meta.model.objects.filter(id=pk).first()
    
    def create(self, request):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            error_messages = analisis_correos()  # Get the error messages
            if error_messages:
            # If there are error messages, return them as a response
                return Response({'mensaje': error_messages}, status=status.HTTP_400_BAD_REQUEST)
            else:
            # If no errors, return a success response
                return Response({'mensaje': 'Los datos se han creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        archivo = CorreoTrabajadores.objects.filter(id=pk).first()
        archivo_serializer= archivo_serializer(archivo, data=request.data)
        if archivo_serializer.is_valid():
            archivo_serializer.save()
            return Response({'mensaje':'Los datos se han editado correctamente'}, status=status.HTTP_200_OK)
        return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        archivo = self.get_queryset().filter(id=pk).first()
        if archivo:
            #archivo.delete()
            archivo.state = False
            archivo.save()
            return Response({'mensaje':'Los datos se han eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe datos con esas caracteristicas'}, status=status.HTTP_400_BAD_REQUEST)
    


class VacacionesTrabajadoresViewSet(viewsets.ModelViewSet):
    serializer_class = VacacionesTrabajadoresSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all().order_by('id')
        return self.get_queryset().Meta.model.objects.filter(id=pk).first()
    
    def create(self, request):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            error_messages = analisis_vacaciones()  # Get the error messages
            if error_messages:
            # If there are error messages, return them as a response
                return Response({'mensaje': error_messages}, status=status.HTTP_400_BAD_REQUEST)
            else:
            # If no errors, return a success response
                return Response({'mensaje': 'Los datos se han creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        archivo = VacacionesTrabajadores.objects.filter(id=pk).first()
        archivo_serializer= archivo_serializer(archivo, data=request.data)
        if archivo_serializer.is_valid():
            archivo_serializer.save()
            return Response({'mensaje':'Los datos se han editado correctamente'}, status=status.HTTP_200_OK)
        return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        archivo = self.get_queryset().filter(id=pk).first()
        if archivo:
            #archivo.delete()
            archivo.state = False
            archivo.save()
            return Response({'mensaje':'Los datos se han eliminado correctamente'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe datos con esas caracteristicas'}, status=status.HTTP_400_BAD_REQUEST)
    