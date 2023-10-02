from ...trabajadores.models import Trabajador
from django.db.models import Q
import pandas as pd
from .guardar_datos import *

#merged_df
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

administrativos = {
        'Dia': '01:00:00',
        'Entrada1': '08:01:00',
        'Entrada1_Atraso': '08:15:00',
        'Salida1': '13:00:00',

        'Entrada2': '15:01:00',
        'Entrada2_Atraso': '15:15:00',
        'Salida2': '18:00:00',
        'Noche': '23:59:59',
}
trabajadores = {
        'Dia': '01:00:00',
        'Entrada1': '07:01:00',
        'Entrada1_Atraso': '07:15:00',
        'Salida1': '12:00:00',

        'Entrada2': '15:00:59',
        'Entrada2_Atraso': '15:15:00',
        'Salida2': '18:00:00',
        'Noche': '23:59:59',
}

def analisis_atrasos(df):
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

def analisis_admin(merged_df):
    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'ADMINISTRATIVO'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'
    analisis_atrasos(df)

def analisis_aulas1(merged_df):
    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'AULAS1'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'
    analisis_atrasos(df)


def analisis_aulas2(merged_df):
    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'AULAS2'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'
    analisis_atrasos(df)


def analisis_aulas3(merged_df):
    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'AULAS3'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'
    analisis_atrasos(df)


def analisis_aulas4(merged_df):
    df = merged_df
    # genero una columnas para almacenar el estado de asistencia
    df['edificio'] = 'AULAS4'
    df['estado'] = ''
    df['hora'] = ''
    df['state'] = 'True'
    analisis_atrasos(df)

