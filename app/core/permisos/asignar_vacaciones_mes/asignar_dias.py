
from core.trabajadores.models import Trabajador


def asignar_dias():
    dias_asignar = 2.5
    servidor_asignar = Trabajador.objects.all().filter(numero_identificacion="0401727623")
    dias_servidor = servidor_asignar.values_list("dias_vacaciones", flat=True).get()
    suma = float(dias_servidor) + dias_asignar
    servidor_asignar.update(dias_vacaciones = suma)
    print('se asigno los dias de vacaciones')
    #Trabajador.objects.filter(nombres=id_trabajador).update(dias_vacaciones=suma_dias)
    