from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
from apscheduler.schedulers.background import BackgroundScheduler
from ..views import send_notification
import logging
import datetime


def job_function(job_id):
    BackgroundScheduler(timezone="America/Guayaquil")
    send_notification()
    print('job %s is runed at %s' %
          (job_id, datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))


def job_exception_listener(event):
    if event.exception:
        # manejo de excepciones
        print("The job crashed :(")
    else:
        print("The job worked :)")


# Inicio sesion
logging.basicConfig()
logging.getLogger('apscheduler').setLevel(logging.DEBUG)

scheduler = BackgroundScheduler(timezone="America/Guayaquil")

# ---------------------------------Este job se activa cada minuto se lo utiliza para realizar test---------------------------------#
#scheduler.add_job(job_function, trigger='interval', args=[1], id='1', name='a test job', max_instances=10, jobstore='default', executor='default', minutes=1)


# ---------------------------------Este job se activa cada dia a las 8 de la mañana notificando al trabajador que sale de vacaciones---------------------------------#
# scheduler.add_job(job_function, trigger='cron', day_of_week='mon-sun', hour=8, minute=00, args=[1], id='1', name='a test job', max_instances=10,jobstore='default', executor='default')
scheduler.add_listener(job_exception_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
scheduler.start()
