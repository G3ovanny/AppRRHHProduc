from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
from apscheduler.schedulers.background import BackgroundScheduler
from .conexion_biometrico import *
import logging
import datetime

is_job_running =  False

def tarea_programada():
    global is_job_running
    if is_job_running:
        print("La tarea ya está en ejecucion, se omitira la ejecucion adicional.")
        return
    is_job_running = True
    try:
        get_connection_admin()
        get_connection_aulas1()
        #get_connection_aulas2()
        get_connection_aulas3()
        get_connection_aulas4()
    finally:
        is_job_running = False

def job_function(job_id):
    tarea_programada()
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
    day_of_week='mon-sun',
    hour=23,
    minute=30,
    args=[1],
    id='1',
    name='Conectar a biometricos',
    max_instances=1, 
    jobstore='default',
    executor='default'
)
scheduler.add_listener(job_exception_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
scheduler.start()
