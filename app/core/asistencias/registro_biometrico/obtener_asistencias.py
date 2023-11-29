from datetime import datetime, timedelta
import pandas as pd
from .analisis_edificios import *

def get_attendance_biometrico(nombre_biometrico ,conn_status, zk):
    try:
        if conn_status:
            print('Iniciando conexion al', nombre_biometrico)
            # obtengo la fecha actual
            today = datetime.now().date()
            fecha_dia_anterior = today - timedelta(days=1)
            # obtendo los registros de asistencia
            attendance_data = zk.get_attendance()

            # obtengo los datos de los usuarios del biometrico
            usuarios = zk.get_users()
            # Filtrar los registros para obtener solo los del día actual
            today_attendance = [
                record for record in attendance_data if record.timestamp.date() == today] #selecciono el dia de asistencia
            

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
            print(funcion)
            # # parametro = zk
            # funcion(merged_df)

        else:
            print('Fallo la conexion al biometrico del', nombre_biometrico)
    except Exception as e:
        print("Proceso terminado: {}".format(e))
    finally:
        if conn_status:
            print('Se desconectó del biometrico', nombre_biometrico)
            zk.disconnect()
