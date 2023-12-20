import datetime
import pandas as pd
from dateutil.relativedelta import *
from app.config.db import POSTGRESQL
from sqlalchemy import create_engine
from core.vacaciones.models import ArchivoCronograma
from core.trabajadores.models import Trabajador

def cargarCronograma():
    database_settings = POSTGRESQL['default']
    engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")
    
    documento = ArchivoCronograma.objects.latest('id').doc
    cronograma = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)})
    fecha_actual = datetime.datetime.now()
    tiempo_actual = fecha_actual + datetime.timedelta(hours=5)
    success_message = []
    error_messages= []
    
    loes = 'Por lo dispuesto en la Ley y en cumplimiento al candelario académico, me permito solicitar de la manera más comedida se autorice mis vacaciones en el periodo antes citado. Fecha de reincorporación a mis actividades,'
    losep = 'Por lo dispuesto en la Ley y en cumplimiento al candelario académico, me permito solicitar de la manera más comedida se autorice mis vacaciones en el periodo antes citado. Fecha de reincorporación a mis actividades,'
    codigo = 'Por lo dispuesto en la Ley y en cumplimiento al candelario académico, me permito solicitar de la manera más comedida se autorice mis vacaciones en el periodo antes citado. Fecha de reincorporación a mis actividades,'
    
    cedula = 'numero_identificacion' in cronograma.columns

    try:
        if cedula:
            cronograma['id_trabajador_id'] = ' '
            cronograma['fecha_solicitud'] = pd.to_datetime(cronograma['fecha_solicitud'], format = '%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
            cronograma['fecha_inicio'] = pd.to_datetime(cronograma['fecha_inicio'], format = '%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
            cronograma['fecha_fin'] = pd.to_datetime(cronograma['fecha_fin'], format = '%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
            cronograma['state'] = 'True'
            cronograma['explicacion'] = ''
            cronograma['fecha_retorno'] = ''
            cronograma['created_date'] = tiempo_actual
            cedula = cronograma['numero_identificacion']
            
            for ced in cedula:
                trabajador = Trabajador.objects.all().filter(numero_identificacion = ced)
                ced_trabajador = trabajador.get().numero_identificacion
                id_trab = trabajador.get().id
                cronograma.loc[cronograma['numero_identificacion'] == ced_trabajador, 'id_trabajador_id'] = id_trab
                cronograma['fecha_inicio'] = pd.to_datetime(cronograma['fecha_inicio'])
                cronograma['fecha_fin'] = pd.to_datetime(cronograma['fecha_fin'])
                cronograma['fecha_retorno'] = cronograma['fecha_fin'] + pd.Timedelta(days=1)
                fecha_retorno = cronograma['fecha_retorno'].astype(str)
                
                ## DETERMINAR REGIMEN
                regimen = trabajador.get().id_regimen_laboral
                # Lógica condicional para determinar acciones basadas en el régimen
                if regimen == "1.SERVICIO CIVIL PUBLICO (LOSEP)":
                    # Realizar acciones si el régimen es "RegimenA"
                    cronograma['explicacion'] = losep + ' ' + fecha_retorno
                elif regimen == "2.CODIGO DEL TRABAJO":
                    # Realizar acciones si el régimen es "RegimenB"
                    cronograma['explicacion'] = codigo + ' ' + fecha_retorno
                else:
                    # Acciones predeterminadas si el régimen no coincide con los anteriores
                    cronograma['explicacion'] = loes + ' ' + fecha_retorno
                # Resta las fechas para obtener la diferencia en días
                if cronograma['fecha_inicio'].notnull().any() and cronograma['fecha_fin'].notnull().any():
                    dias_t = (cronograma['fecha_fin'] - cronograma['fecha_inicio']).dt.days + 1
                    min_dia = (dias_t * 8) * 60
                    cronograma['min_acumulados'] = min_dia
                    ## se obtiene los dias de vacaciones de cada uno de los trabajadores
                    dias = Trabajador.objects.filter(id=id_trab).values_list('dias_vacaciones', flat=True).get()
                    resta_dias = dias - dias_t
                    dia_a_restar = resta_dias[0]
                    Trabajador.objects.filter(id=id_trab).update(dias_vacaciones=dia_a_restar)
                else:
                    cronograma['min_acumulados'] = 0
                ## Minutos acumulados
            cronograma.drop('numero_identificacion', axis = 1, inplace=True )
            cronograma.drop('fecha_retorno', axis = 1, inplace=True )
            cronograma.to_sql('Cronograma_vacaciones', engine, if_exists='append', index=False)
            success_message.append('El documento se ha guardado correctamente')
            return(success_message )
        else:
            return(error_messages)
    except Exception as e:
        error_messages.append(str(e))
        
    if len(error_messages) > 0:
        return error_messages
    elif len(success_message) > 0 :
        return success_message