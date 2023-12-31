from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
from apscheduler.schedulers.background import BackgroundScheduler
import logging
import datetime
from core.vacaciones.asignar_vacaciones_mes.asignar_dias import asignar_dias

def job_function(job_id):
    asignar_dias()
    print('job %s is runed at %s' %
          (job_id, datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))

def job_exception_listener(event):
    if event.exception:
        # manejo de excepciones
        print("La tarea programada(conexión a los biometricos) no se activo :(")
    else:
        print("La tarea programada(conexión a los biometricos) se activo correctamente :)")


# Inicio sesion
logging.basicConfig()
logging.getLogger('apscheduler').setLevel(logging.DEBUG)

scheduler = BackgroundScheduler(timezone="America/Guayaquil")

# ---------------------------------Este job se activa cada dia a las 23:30 en la noche activando la conexión a los biometricos---------------------------------#
scheduler.add_job(
    job_function,
    trigger='cron',
    #day_of_week='mon-sun',
    day=1,
    hour=7,
    minute=0,
    args=[1],
    id='3',
    name='Asignar dias vacaciones mensual', 
    max_instances=1, 
    jobstore='default',
    executor='default'
)
scheduler.add_listener(job_exception_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
scheduler.start()