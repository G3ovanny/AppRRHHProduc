from django.apps import AppConfig


class VacacionesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.vacaciones'

    def ready(self):
        print("Iniciando la tarea de asignación de dias de vacaciones...")
        from .asignar_vacaciones_mes import activar_job
       
