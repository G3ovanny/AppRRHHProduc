from django.apps import AppConfig


class VacacionesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.vacaciones'

    #def ready(self):
    #    print("Iniciando la tarea de notificación de vacaciones...")
    #    from .enviar_email import enviar_email
        #enviar_email.start()