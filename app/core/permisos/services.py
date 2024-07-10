from core.permisos.models import Permiso


def calculo_permisos(id_trabajador):
    permisos = Permiso.objects.filter(id_trabajador=id_trabajador, state = True)
    permisos_cargo_vacaciones = permisos.filter(state = True, id_motivo = 2)
    total_permisos = len(permisos_cargo_vacaciones) 
    print(total_permisos)
    print(permisos_cargo_vacaciones)