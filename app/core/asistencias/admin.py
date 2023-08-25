from zk import ZK
from datetime import datetime, timedelta
import pandas as pd
from sqlalchemy import create_engine
import concurrent.futures
from ..trabajadores.models import Trabajador
from django.db.models import Q
from ..asistencias.models import Asistencia

# Register your models here.

# TODO
# FILTRAR USUARIOS POR NOMBRES
# CONSULTAR EL REGIMEN DE CADA UNO DE LOS USUARIOS DEL BIOMETRICO
# AGREGAR UNA NUEVA COLUMNA EN EL DF CON EL NOMBRE DE CEDULA
# AGREGAR UNA NUEVA COLUMNA EN EL DF CON EL NOMBRE DE REGIMEN
# AGREGAR LA CEDULA DE CADA UNO DE LOS USUARIOS DEL BIOMETRICO EN LA COLUMNA CEDULA
# DISTRIBUIR POR REGIMEN A CADA UNO DE LOS USUARIOS DEL BIOMETRICO
# ANALISAR LAS ASISTENCIAS DE GRUPO DE TRABAJADORES(SERVICIOS)
# CARGAR A LA BASE DE DATOS LA INFORMACION DEL DF


def cargar_datos(documento):
    engine = create_engine('postgresql+psycopg2://postgres:admin123@localhost:5432/TalentoHumano_db')
    nuevoDocumento = documento[[
        'id_trabajador_id',
        'fecha_registro',
        'estado',
        'edificio',
        'hora',
        'state',
    ]]

    nuevoDocumento.to_sql('Asistencia', engine, if_exists='append', index=False)
    #print(nuevoDocumento)

def get_regimen_usuario(nombre_usuario):
    # # print(nombre_usuario)
    # # IBARRA ROSERO EDISON MARCELO
    #nombre_usuario = 'IBARRA R EDISON'
    partes = nombre_usuario.split(' ')

    # # realizo una consulta por cada palabra del string que me envia la columna de nombre_usuario ya que del biometrico no se obtiene mas datos de los usuarios
    consulta = Q()
    for parte in partes:
        consulta &= (Q(nombres__icontains=parte) & Q(nombres__icontains=parte) & Q(nombres__icontains=parte))
    # # obtengo los datos del servidor
    data_trabajador = Trabajador.objects.filter(consulta)
    
    #TODO # ANALISAR LOS USUARIOS DUPLICADOS

    try:
        if data_trabajador.exists():
            trabajador = data_trabajador.first()  # Obtengo el primer registro
            id_trabajador_id = trabajador.id
            id_regimen = trabajador.id_regimen_laboral
            regimen = str(id_regimen)
        else:
            id_trabajador_id = ''
            regimen = ''

        return regimen, id_trabajador_id
    except Trabajador.DoesNotExist:
        id_trabajador_id = ''
        regimen = ''
        return regimen, id_trabajador_id
    except Exception as e:
        print("Error en la búsqueda: {}".format(e))

def analisis_admin(merged_df):
    administrativos = {
        'Dia': '01:00:00',
        'Entrada1': '08:00:59',
        'Entrada1_Atraso': '08:15:00',
        'Salida1': '13:00:00',

        'Entrada2': '15:00:59',
        'Entrada2_Atraso': '15:15:00',
        'Salida2': '18:00:00',
        'Noche': '23:59:59',
    }
    trabajadores = {
        'Dia': '01:00:00',
        'Entrada1': '07:00:59',
        'Entrada1_Atraso': '07:15:00',
        'Salida1': '12:00:00',

        'Entrada2': '15:00:59',
        'Entrada2_Atraso': '15:15:00',
        'Salida2': '18:00:00',
        'Noche': '23:59:59',
    }

    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'ADMINISTRATIVO'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'

    #df['regimen'] =''
    #df['id_trabajador'] = ''
    df.loc[df['fecha_registro'] !=
                  "", 'hora'] = df['fecha_registro']
    # convierto  a formatos de fecha y hora
    df['hora'] = pd.to_datetime(df['hora'])
    df['fecha_registro'] = pd.to_datetime(df['fecha_registro'])

    # asigno columna como index para porder trabajar con fechas
    #df.set_index('fecha_registro', inplace=True)

    df[['regimen', 'id_trabajador_id']] = df['nombre_usuario'].apply(lambda x: pd.Series(get_regimen_usuario(x)))
    

    grupos = df.groupby('regimen')

    for nombre_grupo, documento in grupos:
        #print(type(nombre_grupo))
        #print(f"Grupo: {nombre_grupo}")
        if 'LOSEP' in nombre_grupo:
            ################################ HORARIOS ADMINISTRATIvOS #################################
            ################################# 1.SERVICIO CIVIL PUBLICO (LOSEP) #########################
            a_dia = pd.to_datetime(administrativos['Dia']).time()
            a_entrada1 = pd.to_datetime(administrativos['Entrada1']).time()
            a_entrada1_atraso = pd.to_datetime(administrativos['Entrada1_Atraso']).time()
            a_salida_almuerzo = pd.to_datetime(administrativos['Salida1']).time()
            a_entrada2 = pd.to_datetime(administrativos['Entrada2']).time()
            a_entrada2_atraso = pd.to_datetime(administrativos['Entrada2_Atraso']).time()
            a_salida_fin = pd.to_datetime(administrativos['Salida2']).time()
            a_noche = pd.to_datetime(administrativos['Noche']).time()

            # # madrugada
            documento_madrugada = documento[(documento['hora'].dt.time > a_dia) & (documento['hora'].dt.time <= a_entrada1)]
            documento_madrugada.loc[documento_madrugada['regimen'].str.contains('LOSEP'), 'estado'] = 'Madrugada'

            # atrasos en la mañana
            documento_atrasos_dia = documento[(documento['hora'].dt.time > a_entrada1) & (documento['hora'].dt.time <= a_entrada1_atraso)]
            documento_atrasos_dia.loc[documento_atrasos_dia['regimen'].str.contains('LOSEP'), 'estado'] = 'Atrasado'

            # permisos en la mañana
            documento_permisos_dia = documento[(documento['hora'].dt.time > a_entrada1_atraso) & (documento['hora'].dt.time <= a_salida_almuerzo)]
            documento_permisos_dia.loc[documento_permisos_dia['regimen'].str.contains('LOSEP'), 'estado'] = 'Permiso'

            # almuerzo
            documento_almuerzo = documento[(documento['hora'].dt.time > a_salida_almuerzo) & (documento['hora'].dt.time <= a_entrada2)]
            documento_almuerzo.loc[documento_almuerzo['regimen'].str.contains('LOSEP'), 'estado'] = 'Almuerzo'

            # atrasos en la tarde
            documento_atrasos_tarde = documento[(documento['hora'].dt.time > a_entrada2) & (documento['hora'].dt.time <= a_entrada2_atraso)]
            documento_atrasos_tarde.loc[documento_atrasos_tarde['regimen'].str.contains('LOSEP'), 'estado'] = 'Atrasado'

            # permiso en la tarde
            documento_permisos_tarde = documento[(documento['hora'].dt.time > a_entrada2_atraso) & (documento['hora'].dt.time <= a_salida_fin)]
            documento_permisos_tarde.loc[documento_permisos_tarde['regimen'].str.contains('LOSEP'), 'estado'] = 'Permiso'

            # noche
            documento_noche = documento[(documento['hora'].dt.time > a_salida_fin) & (documento['hora'].dt.time <= a_noche)]
            documento_noche.loc[documento_noche['regimen'].str.contains('LOSEP'), 'estado'] = 'Noche'

            # genero un documento final
            doc_administrativos = pd.concat([documento_madrugada, documento_atrasos_dia, documento_permisos_dia, documento_almuerzo,
                                  documento_atrasos_tarde, documento_permisos_tarde, documento_noche], ignore_index=True)
            cargar_datos(doc_administrativos)
            #nombre_archivo = (f"Administrativos.xlsx")
            #doc_administrativos.to_excel(nombre_archivo, index=False)
        elif 'CODIGO' in nombre_grupo:
            ################################# HORARIOS ADMINISTRATIvOS #################################
            ################################# 2.CODIGO DEL TRABAJO  #########################
            t_dia = pd.to_datetime(trabajadores['Dia']).time()
            t_entrada1 = pd.to_datetime(trabajadores['Entrada1']).time()
            t_entrada1_atraso = pd.to_datetime(trabajadores['Entrada1_Atraso']).time()
            t_salida_almuerzo = pd.to_datetime(trabajadores['Salida1']).time()
            t_entrada2 = pd.to_datetime(trabajadores['Entrada2']).time()
            t_entrada2_atraso = pd.to_datetime(trabajadores['Entrada2_Atraso']).time()
            t_salida_fin = pd.to_datetime(trabajadores['Salida2']).time()
            t_noche = pd.to_datetime(trabajadores['Noche']).time()

            # madrugada
            documento_madrugada = documento[(documento['hora'].dt.time > t_dia) & (documento['hora'].dt.time <= t_entrada1)]
            documento_madrugada.loc[documento_madrugada['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Madrugada'

            # atrasos en la mañana
            documento_atrasos_dia = documento[(documento['hora'].dt.time > t_entrada1) & (documento['hora'].dt.time <= t_entrada1_atraso)]
            documento_atrasos_dia.loc[documento_atrasos_dia['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Atrasado'

            # permisos en la mañana
            documento_permisos_dia = documento[(documento['hora'].dt.time > t_entrada1_atraso) & (documento['hora'].dt.time <= t_salida_almuerzo)]
            documento_permisos_dia.loc[documento_permisos_dia['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Permiso'

            # almuerzo
            documento_almuerzo = documento[(documento['hora'].dt.time > t_salida_almuerzo) & (documento['hora'].dt.time <= t_entrada2)]
            documento_almuerzo.loc[documento_almuerzo['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Almuerzo'

            # atrasos en la tarde
            documento_atrasos_tarde = documento[(documento['hora'].dt.time > t_entrada2) & (documento['hora'].dt.time <= t_entrada2_atraso)]
            documento_atrasos_tarde.loc[documento_atrasos_tarde['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Atrasado'

            # permiso en la tarde
            documento_permisos_tarde = documento[(documento['hora'].dt.time > t_entrada2_atraso) & (documento['hora'].dt.time <= t_salida_fin)]
            documento_permisos_tarde.loc[documento_permisos_tarde['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Permiso'

            # noche
            documento_noche = documento[(documento['hora'].dt.time > t_salida_fin) & (documento['hora'].dt.time <= t_noche)]
            documento_noche.loc[documento_noche['regimen'].str.contains('2.CODIGO DEL TRABAJO'), 'estado'] = 'Noche'

            # genero un documento final
            doc_trabajadores = pd.concat([documento_madrugada, documento_atrasos_dia, documento_permisos_dia, documento_almuerzo, documento_atrasos_tarde, documento_permisos_tarde, documento_noche], ignore_index=True)
            
            cargar_datos(doc_trabajadores)
            #nombre_archivo = (f"Trabajadores.xlsx")
            #doc_trabajadores.to_excel(nombre_archivo, index=False)

        elif 'OTROS' in nombre_grupo:
            cargar_datos(documento)
            #nombre_archivo = (f"Otros.xlsx")
            #documento.to_excel(nombre_archivo, index=False)

    # ejemplo en archivo en formato ecxel
    #doc_final = pd.concat([doc_administrativos, doc_trabajadores, documento], ignore_index=True)
    #nombre_archivo = (f"Administrativo.xlsx")
    #doc_final.to_excel(nombre_archivo, index=False)

def analisis_aulas1(merged_df):
    documento = merged_df
    # genero una columnas para almacenar el estado de asistencia
    documento['edificio'] = 'AULAS1'
    documento['estado'] = ''
    documento['hora'] = ''
    documento['state'] = 'True'
    #documento['regimen'] =''
    #documento['id_trabajador_id'] = ''
    documento.loc[documento['fecha_registro'] !=
                  "", 'hora'] = documento['fecha_registro']
    # convierto  a formatos de fecha y hora
    documento['hora'] = pd.to_datetime(documento['hora'])
    documento['fecha_registro'] = pd.to_datetime(documento['fecha_registro'])

    # asigno columna como index para porder trabajar con fechas
    #documento.set_index('fecha_registro', inplace=True)

    documento[['regimen', 'id_trabajador_id']] = documento['nombre_usuario'].apply(lambda x: pd.Series(get_regimen_usuario(x)))
    
    cargar_datos(documento)
    #grupos = documento.groupby('regimen')


def analisis_aulas2(merged_df):
    documento = merged_df
    # genero una columnas para almacenar el estado de asistencia
    documento['edificio'] = 'AULAS2'
    documento['estado'] = ''
    documento['hora'] = ''
    documento['state'] = 'True'
    #documento['regimen'] =''
    #documento['id_trabajador_id'] = ''
    documento.loc[documento['fecha_registro'] !=
                  "", 'hora'] = documento['fecha_registro']
    # convierto  a formatos de fecha y hora
    documento['hora'] = pd.to_datetime(documento['hora'])
    documento['fecha_registro'] = pd.to_datetime(documento['fecha_registro'])

    # asigno columna como index para porder trabajar con fechas
    #documento.set_index('fecha_registro', inplace=True)

    documento[['regimen', 'id_trabajador_id']] = documento['nombre_usuario'].apply(lambda x: pd.Series(get_regimen_usuario(x)))
    
    cargar_datos(documento)

def analisis_aulas3(merged_df):
    documento = merged_df
    # genero una columnas para almacenar el estado de asistencia
    documento['edificio'] = 'AULAS3'
    documento['estado'] = ''
    documento['hora'] = ''
    documento['state'] = 'True'
    #documento['regimen'] =''
    #documento['id_trabajador_id'] = ''
    documento.loc[documento['fecha_registro'] !=
                  "", 'hora'] = documento['fecha_registro']
    # convierto  a formatos de fecha y hora
    documento['hora'] = pd.to_datetime(documento['hora'])
    documento['fecha_registro'] = pd.to_datetime(documento['fecha_registro'])

    # asigno columna como index para porder trabajar con fechas
    #documento.set_index('fecha_registro', inplace=True)

    documento[['regimen', 'id_trabajador_id']] = documento['nombre_usuario'].apply(lambda x: pd.Series(get_regimen_usuario(x)))
    
    cargar_datos(documento)


def analisis_aulas4(merged_df):
    documento = merged_df
    # genero una columnas para almacenar el estado de asistencia
    documento['edificio'] = 'AULAS4'
    documento['estado'] = ''
    documento['hora'] = ''
    documento['state'] = 'True'
    #documento['regimen'] =''
    #documento['id_trabajador_id'] = ''
    documento.loc[documento['fecha_registro'] !=
                  "", 'hora'] = documento['fecha_registro']
    # convierto  a formatos de fecha y hora
    documento['hora'] = pd.to_datetime(documento['hora'])
    documento['fecha_registro'] = pd.to_datetime(documento['fecha_registro'])

    # asigno columna como index para porder trabajar con fechas
    #documento.set_index('fecha_registro', inplace=True)

    documento[['regimen', 'id_trabajador_id']] = documento['nombre_usuario'].apply(lambda x: pd.Series(get_regimen_usuario(x)))
    
    cargar_datos(documento)


def get_attendance_biometrico(nombre_biometrico, conn_status, zk):
    try:
        if conn_status:
            print('Conectando al biometrico del: ', nombre_biometrico)
            # obtengo la fecha actual
            today = datetime.now().date()
            fecha_dia_anterior = today - timedelta(days=1)
            # obtendo los registros de asistencia
            attendance_data = zk.get_attendance()

            # obtengo los datos de los usuarios del biometrico
            usuarios = zk.get_users()
            # Filtrar los registros para obtener solo los del día actual
            today_attendance = [
                record for record in attendance_data if record.timestamp.date() == today]

            # almaceno los usuarios del biometrico en una lista
            data_user = []
            for usuario in usuarios:
                data_user.append({
                    'id_usuario': usuario.user_id,
                    'nombre_usuario': usuario.name
                })
            # almaceno los registros de asistencias en una lista
            data_list = []
            for record in today_attendance:
                data_list.append({
                    'id_usuario': record.user_id,
                    'fecha_registro': record.timestamp
                })

            # convierto las listas en datframes
            df_usuarios = pd.DataFrame(data_user)
            df_registros = pd.DataFrame(data_list)

            # uso la funcion merger de pandas para combinar los DataFrames en base a la columna 'id_usuario'
            merged_df = df_registros.merge(
                df_usuarios, on='id_usuario', how='left')

            print('Nombre del biometrico', nombre_biometrico)

            def switch_case(nombre_biometrico):
                switch_dict = {
                    'EDIFICIO_ADMINISTRATIVO': analisis_admin,
                    'EDIFICIO_AULAS1': analisis_aulas1,
                    'EDIFICIO_AULAS2': analisis_aulas2,
                    'EDIFICIO_AULAS3': analisis_aulas3,
                    'EDIFICIO_AULAS4': analisis_aulas4,
                }
                return switch_dict.get(nombre_biometrico)
            funcion = switch_case(nombre_biometrico)
            # parametro = zk
            funcion(merged_df)

        else:
            print('Fallo la conexion al biometrico del', nombre_biometrico)
    except Exception as e:
        print("Proceso terminado: {}".format(e))
    finally:
        if conn_status:
            print('Se desconectó del biometrico', nombre_biometrico)
            zk.disconnect()


def get_connection_admin():
    # conexión biometrico administrativo#
    nombre_biometrico = "EDIFICIO_ADMINISTRATIVO"
    ip_address = "10.100.100.230"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, conn_status, zk)


def get_connection_aulas1():
    # Conexión al biometrico del edificio aulas 1
    nombre_biometrico = "EDIFICIO_AULAS1"
    ip_address = "172.20.4.151"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas2():
    nombre_biometrico = "EDIFICIO_AULAS2"
    ip_address = "172.20.4.152"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas3():
    nombre_biometrico = "EDIFICIO_AULAS3"
    ip_address = "172.20.4.153"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas4():
    nombre_biometrico = "EDIFICIO_AULAS4"
    ip_address = "172.20.4.154"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


# with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
#     future1 = executor.submit(get_connection_admin)
#     # future2 = executor.submit(get_connection_aulas1)
#     # future3 = executor.submit(get_connection_aulas2)
#     # future4 = executor.submit(get_connection_aulas3)
#     # future5 = executor.submit(get_connection_aulas4)

# concurrent.futures.wait([
#     future1,
#     # future2,
#     # future3,
#     # future4,
#     # future5
# ])
