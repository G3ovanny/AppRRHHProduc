from django.http import JsonResponse
from core.permisos.models import Permiso
from rest_framework import status, viewsets
from rest_framework.response import Response
from datetime import datetime

class PermisosTrabajadorViewSet(viewsets.ViewSet):

    def list(self, request):
        id_trabajador = request.query_params.get('id_trabajador')
        if id_trabajador:
            print( id_trabajador )
            # Obtener los permisos del trabajador
            permisos = Permiso.objects.filter(id_trabajador=id_trabajador, state=True)

            # Inicializar la lista de permisos
            permisos_list = []

            # Calcular el total de permisos por año y la suma en minutos
            for permiso in permisos:
                anio = permiso.fecha_hora_salida.year
                permiso_data = {
                    'anio': anio,
                    'total_permisos': 0,
                    'total_minutos': 0,
                    'total_dias': 0,
                    'total_horas': 0
                }
                if permiso.min_acumulados:
                    permiso_data['total_permisos'] += 1
                    permiso_data['total_minutos'] += permiso.min_acumulados
                    permiso_data['total_dias'] = permiso_data['total_minutos'] // 1440
                    permiso_data['total_horas'] = (permiso_data['total_minutos'] % 1440) // 60
                # Comprobar si ya existe el año en la lista de permisos
                index = next((i for i, item in enumerate(permisos_list) if item['anio'] == anio), None)
                if index is not None:
                    # Si el año ya existe, actualizar los totales
                    permisos_list[index]['total_permisos'] += permiso_data['total_permisos']
                    permisos_list[index]['total_minutos'] += permiso_data['total_minutos']
                    permisos_list[index]['total_dias'] += permiso_data['total_dias']
                    permisos_list[index]['total_horas'] += permiso_data['total_horas']
                else:
                    # Si el año no existe, añadirlo a la lista
                    permisos_list.append(permiso_data)

            # Devolver los resultados como JSON
            return JsonResponse({'permisos': permisos_list})

        return Response({}, status=status.HTTP_400_BAD_REQUEST)