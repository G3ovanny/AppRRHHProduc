from app.config import settings
from django.core.mail import send_mail, send_mass_mail
from .models import CronogramaVacaciones
from ..trabajadores.models import Trabajador
from datetime import date, timedelta
# Create your views here.


def send_notification():
    now = date.today()
    # variable con los dias de anticipacion a los dias de vacaciobes#
    td = timedelta(7)
    dia_notificacion = now + td
    # se optienen los datos de lo  trabajadores que estan por salir de vacaciones
    id_trab_sale = CronogramaVacaciones.objects.all().filter(state=True, fecha_inicio=dia_notificacion).values_list('id_trabajador', flat=True)

    direct = ['talento.humano@upec.edu.ec']

    try:
        trabajadores = Trabajador.objects.all().filter(id__in=id_trab_sale)
        for trabajador in trabajadores:
            # se obtiene el correo de cada trabajador y se envia el mensaje
            subject = 'Notificación de vacaciones'
            recipient_list = [trabajador.correo_institucional]
            # recipient_list = ['rocio.montenegro@upec.edu.ec']
            email_from = settings.EMAIL_HOST_USER
            mensaje_trab = ('Esperamos que este mensaje te encuentre bien.\nEn primer lugar, queremos agradecerte sinceramente por tu dedicación y esfuerzo continuo en el desarrollo de tus labores en La Universidad Politécnica Estatal Del Carchi.\nSin embargo, nos complace informarte que ha llegado el momento para que puedas disfrutar de un merecido período de vacaciones.\n \n'
                            'Como parte del proceso para que puedas disfrutar plenamente de tus vacaciones, es importante llevar a cabo algunos trámites pertinentes. A continuación, te indicamos los pasos a seguir:\n \n'
                            '1. Por favor, acércate al Departamento de Talento Humano para revisar y firmar los documentos relacionados con el periodo de vacaciones y asegurarte de que estén correctamente registradas.\n'
                            '2. Si es necesario, coordina con tu líder o jefe inmediato para asegurarte de que tus responsabilidades y tareas estén debidamente cubiertas durante tu ausencia. Esto garantizará que el equipo siga operando sin problemas.\n'
                            '3. Asegúrate de comunicar a tus compañeros de equipo y colaboradores cercanos acerca de tus fechas de vacaciones y cómo pueden contactarte en caso de emergencias.\n'
                            '4. Si tienes equipos o proyectos bajo tu supervisión, asegúrate de delegar tareas y responsabilidades clave a tus colegas para mantener la continuidad de los proyectos en curso.\n \n'

                            'Recuerda que el equipo de Talento Humano estará disponible para brindarte todo el apoyo necesario durante el proceso de trámite de tus vacaciones.\nNo dudes en acercarte si tienes alguna duda o inquietud al respecto.\n'
                            'Disfruta al máximo de tu tiempo de descanso y esperamos que regreses renovado y con nuevas energías para seguir contribuyendo al éxito de nuestra empresa.\n \n'

                            '¡Que tengas unas felices vacaciones!\n \n'
                            'Atentamente, \n\n'
                            'DIRECCIÓN DE TALENTO HUMANO. \n'
                            )
            mensaje_direc = (
                'El señor tiene programadas sus vacaciones para salir en 7 dias')
            mensaje_uno = ', '.join(mensaje_trab)  # mensaje al tranajador#
            mensaje_dos = ', '.join(mensaje_direc)  # mensaje director#
            message1 = (subject, mensaje_trab, email_from, recipient_list)
            message2 = (subject, mensaje_direc, email_from, direct)
            send_mass_mail((message1, message2), fail_silently=False)
    except Exception as e:
        print(e)
