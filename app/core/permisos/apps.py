from django.apps import AppConfig


class PermisosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.permisos'

    def ready(self):
        print("************************Inicializado tarea de asignacion de dias de vacaciones a cada trabajador****************")
        from .asignar_vacaciones_mes import activar_job

