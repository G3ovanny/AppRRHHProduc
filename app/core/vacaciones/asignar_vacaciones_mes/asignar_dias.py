
from core.trabajadores.models import Trabajador
import datetime
from core.distributivo.models import Modalidad_Laboral
from django.db.models import Q #permite los filtros sin tener en cuenta mayusculas o minusculas
from core.distributivo.models import Regimen_Laboral

#esta funcion permite asignar 2.5 dias de cavaciones a cada uno de los servidores, si el servidor ha ingresado en el mes dias despues
#se realizara el calculo de dias y se le agregara el proporcional de los dias
def asignar_dias():
    fecha_actual = datetime.date.today()
    dias_asignar = 2.5
    servidor_asignar = Trabajador.objects.all().filter(state = True)
    id_ocasionales = Modalidad_Laboral.objects.all().filter(Q(modalidad_laboral__icontains="ocasionales") | Q(modalidad_laboral__iexact="CONTRATOS OCASIONALES")).values_list('id', flat=True).get()
    id_regimen = Regimen_Laboral.objects.all().filter(Q(regimen_laboral__icontains= "codigo") | Q(regimen_laboral__iexact="CODIGO DE TRABAJO")).values_list('id', flat=True).get()
    for servidor in servidor_asignar:
        dias_servidor = servidor.dias_vacaciones

        if servidor.id_modalidad_laboral.id == id_ocasionales:
            diferencia_fechas = fecha_actual - servidor.fecha_inicio
            dias = diferencia_fechas.days
            if dias > 30:
                suma = float(dias_servidor) + dias_asignar
                suma_redondeada = round(suma, 2)
                id_servidor = servidor.id
                Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada) 
            else:
                suma = (dias * 2.5)/30
                suma_redondeada = round(suma, 2)
                id_servidor = servidor.id
                Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada)
        elif servidor.id_regimen_laboral.id == id_regimen:
            diferencia_fechas = fecha_actual - servidor.fecha_inicio
            dias = diferencia_fechas.days
            es_primero_de_enero = fecha_actual.month == 1 and fecha_actual.day == 1
            if es_primero_de_enero:
                anios = dias / 365.25
                anios_redondeada = round(anios, 2)
                if anios_redondeada < 6 :
                    # se suman 15 dias de vacaciones cada año si el servidor tiene menos de 6 años de servicio
                    dias_vacaciones = 15
                    dias_vacaciones += (anios_redondeada - 5)
                    suma = float(dias_servidor) + dias_vacaciones
                    suma_redondeada = round(suma, 2)
                    
                    id_servidor = servidor.id
                    Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada)
                else:
                    # si son mas años de servicio se le sumaran los 15 dias mas 1 dia mas si tiene mas de 6 años
                    dias_vacaciones = 16
                    dias_vacaciones += (anios_redondeada - 6)
                    if dias_vacaciones <= 30:
                        suma = float(dias_servidor) + dias_vacaciones
                        suma_redondeada = round(suma, 2)
                        
                        id_servidor = servidor.id  
                        Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada)
                    else:
                        suma = float(dias_servidor) + 30
                        suma_redondeada = round(suma, 2)
                        
                        id_servidor = servidor.id
                        Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada)
        else: #a todos se les sumaran 2.5 dias a sus vacaciones
            suma = float(dias_servidor) + dias_asignar
            suma_redondeada = round(suma, 2)
            id_servidor = servidor.id
            Trabajador.objects.filter(id=id_servidor).update(dias_vacaciones=suma_redondeada)
    