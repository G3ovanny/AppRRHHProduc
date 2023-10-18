from django.apps import AppConfig


class AsistenciasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.asistencias'

    ## funcion que permite activar tareas programadas que se genera desde la carpeta registro_biometrico/activar_job.py
    # def ready(self):
    #    print("Iniciando la tarea de registro de asistencia biometrico...")
       #from .registro_biometrico import activar_job
       