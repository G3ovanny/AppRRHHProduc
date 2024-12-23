import pandas as pd
from rest_framework.response import Response
from sqlalchemy import create_engine
from rest_framework import status
from .models import ArchivoTrabajadores
from core.distributivo.models import *
from core.trabajadores.models import *
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def analisis_trabajadores():
    try:
        database_settings = settings.DATABASES['default']
        engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")
        
        documento = ArchivoTrabajadores.objects.latest('id').doc
        distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)})

        valid_columns = [
            'id_unidad_organica_id', 'id_denominacion_puesto_id', 'id_estructura_programatica_id',
            'id_regimen_laboral_id', 'id_nivel_ocupacional_id', 'id_modalidad_laboral_id',
            'id_escala_ocupacional_id', 'id_grado_id', 'numero_identificacion', 'tipo_identificacion',
            'partida_individual', 'fecha_inicio', 'fecha_fin', 'rmu_puesto', 'nombres', 'celular',
            'state', 'estado_servidor'
        ]

        required_columns = [
            'numero_identificacion', 'cod_unidad_organica', 'cod_denominacion_puesto', 
            'cod_regimen', 'cod_modalidad', 'nivel_ocupacional', 'estructura_programatica', 
            'cod_escala_ocupacional', 'grado', 'partida_individual', 'fecha_inicio', 
            'fecha_fin', 'rmu_puesto', 'nombres', 'estado_servidor'
        ]

        missing_columns = [col for col in required_columns if col not in distributivo.columns]
        if missing_columns:
            return [f"Columnas faltantes: {', '.join(missing_columns)}"]

        error_messages = []
        row_errors = {}
        
        # Initialize new columns
        for col in valid_columns:
            if col not in distributivo.columns:
                distributivo[col] = ''

        distributivo['state'] = 'True'
        distributivo['celular'] = ''

        # Process rows
        for idx, row in distributivo.iterrows():
            row_errors[idx] = []
            
            try:
                distributivo.loc[idx, 'fecha_inicio'] = pd.to_datetime(row['fecha_inicio']).strftime('%Y-%m-%d')
                distributivo.loc[idx, 'fecha_fin'] = pd.to_datetime(row['fecha_fin']).strftime('%Y-%m-%d')
            except Exception as e:
                row_errors[idx].append(f"Error en fechas: {str(e)}")

            validations = [
                ('grado', Grado, 'grado', 'id_grado_id'),
                ('cod_denominacion_puesto', Denominacion_Puesto, 'cod_denominacion_puesto', 'id_denominacion_puesto_id'),
                ('cod_unidad_organica', Unidad_Organica, 'cod_unidad', 'id_unidad_organica_id'),
                ('cod_regimen', Regimen_Laboral, 'cod_regimen', 'id_regimen_laboral_id'),
                ('nivel_ocupacional', Nivel_Ocupacional, 'nivel_ocupacional', 'id_nivel_ocupacional_id'),
                ('cod_escala_ocupacional', Escala_Ocupacional, 'cod_escala_ocupacional', 'id_escala_ocupacional_id'),
                ('cod_modalidad', Modalidad_Laboral, 'cod_modalidad', 'id_modalidad_laboral_id'),
                ('estructura_programatica', Estructura_Programatica, 'estructura_programatica', 'id_estructura_programatica_id')
            ]

            for excel_field, model, db_field, id_field in validations:
                try:
                    value = str(row[excel_field])
                    obj = model.objects.filter(**{db_field: value}).first()
                    if obj:
                        distributivo.loc[idx, id_field] = obj.id
                    else:
                        row_errors[idx].append(f"Código {value} no existe para {excel_field}")
                except Exception as e:
                    row_errors[idx].append(f"Error en {excel_field}: {str(e)}")

        # Process errors
        rows_with_errors = [idx for idx, errors in row_errors.items() if errors]
        if rows_with_errors:
            return [f"Fila {idx + 2}: {'; '.join(row_errors[idx])}" for idx in rows_with_errors]

        # Process valid records
        distributivo = distributivo[valid_columns]
        distributivo.fillna('', inplace=True)

        for idx, row in distributivo.iterrows():
            try:
                cedula = row['numero_identificacion']
                trabajador = Trabajador.objects.filter(numero_identificacion=cedula).first()
                
                if trabajador:
                    for field in valid_columns:
                        setattr(trabajador, field, row[field])
                    trabajador.save()
                else:
                    Trabajador.objects.create(**row.to_dict())
                    
            except Exception as e:
                error_messages.append(f"Error en fila {idx + 2} (cedula: {cedula}): {str(e)}")

        return ["Documento procesado correctamente"] if not error_messages else error_messages

    except Exception as e:
        return [f"Error general: {str(e)}"]

# import pandas as pd
# from rest_framework.response import Response
# from sqlalchemy import create_engine
# from rest_framework import status
# from .models import ArchivoTrabajadores
# from core.distributivo.models import *
# from core.trabajadores.models import *
# from django.conf import settings

# def analisis_trabajadores():
#     database_settings = settings.DATABASES['default']
#     engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")

#     try:
#         documento = ArchivoTrabajadores.objects.latest('id').doc
#         distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)})
#     except Exception as e:
#         return [f"Error al leer el archivo Excel: {str(e)}"]

#     error_messages = []
#     row_errors = {}
#     success_message = []
    
#     required_columns = [
#         'numero_identificacion', 'cod_unidad_organica', 'cod_denominacion_puesto', 
#         'cod_regimen', 'cod_modalidad', 'nivel_ocupacional', 'estructura_programatica', 
#         'cod_escala_ocupacional', 'grado', 'partida_individual', 'fecha_inicio', 
#         'fecha_fin', 'rmu_puesto', 'nombres', 'estado_servidor'
#     ]
    
#     # Validate required columns
#     missing_columns = [col for col in required_columns if col not in distributivo.columns]
#     if missing_columns:
#         return [f"Columnas faltantes en el archivo: {', '.join(missing_columns)}"]

#     try:
#         # Initialize new columns
#         distributivo['id_unidad_organica_id'] = ''
#         distributivo['id_denominacion_puesto_id'] = ''
#         distributivo['id_regimen_laboral_id'] = ''
#         distributivo['id_nivel_ocupacional_id'] = ''
#         distributivo['id_modalidad_laboral_id'] = ''
#         distributivo['id_estructura_programatica_id'] = ''
#         distributivo['id_escala_ocupacional_id'] = ''
#         distributivo['id_grado_id'] = ''
#         distributivo['state'] = 'True'
#         distributivo['celular'] = ''

#         # Process each row
#         for idx, row in distributivo.iterrows():
#             row_errors[idx] = []
            
#             # Date validation and conversion
#             try:
#                 distributivo.loc[idx, 'fecha_inicio'] = pd.to_datetime(row['fecha_inicio'], format='%d/%m/%Y %H:%M:%S').strftime('%Y-%m-%d')
#                 distributivo.loc[idx, 'fecha_fin'] = pd.to_datetime(row['fecha_fin'], format='%d/%m/%Y %H:%M:%S').strftime('%Y-%m-%d')
#             except Exception as e:
#                 row_errors[idx].append(f"Error en formato de fechas: {str(e)}")

#             # Validate and process each field
#             validations = [
#                 ('grado', Grado, 'grado', 'id_grado_id', 'grado'),
#                 ('cod_denominacion_puesto', Denominacion_Puesto, 'cod_denominacion_puesto', 'id_denominacion_puesto_id', 'denominación'),
#                 ('cod_unidad_organica', Unidad_Organica, 'cod_unidad', 'id_unidad_organica_id', 'unidad orgánica'),
#                 ('cod_regimen', Regimen_Laboral, 'cod_regimen', 'id_regimen_laboral_id', 'régimen laboral'),
#                 ('nivel_ocupacional', Nivel_Ocupacional, 'nivel_ocupacional', 'id_nivel_ocupacional_id', 'nivel ocupacional'),
#                 ('cod_escala_ocupacional', Escala_Ocupacional, 'cod_escala_ocupacional', 'id_escala_ocupacional_id', 'escala ocupacional'),
#                 ('cod_modalidad', Modalidad_Laboral, 'cod_modalidad', 'id_modalidad_laboral_id', 'modalidad laboral'),
#                 ('estructura_programatica', Estructura_Programatica, 'estructura_programatica', 'id_estructura_programatica_id', 'estructura programática')
#             ]

#             for excel_field, model, db_field, id_field, display_name in validations:
#                 try:
#                     value = str(row[excel_field])
#                     obj = model.objects.filter(**{db_field: value}).first()
#                     if obj:
#                         distributivo.loc[idx, id_field] = obj.id
#                     else:
#                         row_errors[idx].append(f"Código {value} no existe para {display_name}")
#                 except Exception as e:
#                     row_errors[idx].append(f"Error procesando {display_name}: {str(e)}")

#         # Remove rows with errors and create error messages
#         rows_with_errors = [idx for idx, errors in row_errors.items() if errors]
#         error_messages.extend([f"Fila {idx + 2} (Excel): {'; '.join(row_errors[idx])}" for idx in rows_with_errors])
        
#         if error_messages:
#             return error_messages

#         # Process valid data
#         distributivo.fillna('', inplace=True)
#         nuevodf = distributivo.copy()

#         # Update existing workers
#         for idx, row in distributivo.iterrows():
#             cedula = row['numero_identificacion']
#             trabajadores = Trabajador.objects.filter(numero_identificacion=cedula)
            
#             if trabajadores.exists():
#                 for trabajador in trabajadores:
#                     update_fields = [
#                         'partida_individual', 'id_unidad_organica_id', 'id_denominacion_puesto_id',
#                         'id_estructura_programatica_id', 'id_regimen_laboral_id', 'id_nivel_ocupacional_id',
#                         'id_modalidad_laboral_id', 'id_grado_id', 'id_escala_ocupacional_id',
#                         'numero_identificacion', 'rmu_puesto', 'nombres', 'celular', 'state',
#                         'estado_servidor', 'fecha_inicio', 'fecha_fin'
#                     ]
                    
#                     for field in update_fields:
#                         setattr(trabajador, field, row[field])
                    
#                     try:
#                         trabajador.save()
#                         nuevodf = nuevodf.drop(idx)
#                     except Exception as e:
#                         error_messages.append(f"Error al actualizar trabajador {cedula}: {str(e)}")

#         # Insert new workers
#         if not nuevodf.empty:
#             try:
#                 columns_to_save = [
#                     'id_unidad_organica_id', 'id_denominacion_puesto_id', 'id_estructura_programatica_id',
#                     'id_regimen_laboral_id', 'id_nivel_ocupacional_id', 'id_modalidad_laboral_id',
#                     'id_escala_ocupacional_id', 'id_grado_id', 'numero_identificacion', 'tipo_identificacion',
#                     'partida_individual', 'fecha_inicio', 'fecha_fin', 'rmu_puesto', 'nombres', 'celular',
#                     'state', 'estado_servidor'
#                 ]
#                 nuevodf[columns_to_save].to_sql('Trabajador', engine, if_exists='append', index=False)
#                 success_message.append('El documento se ha guardado correctamente')
#             except Exception as e:
#                 error_messages.append(f"Error al insertar nuevos trabajadores: {str(e)}")

#     except Exception as e:
#         error_messages.append(f"Error general en el procesamiento: {str(e)}")

#     return error_messages if error_messages else success_message



# import pandas as pd
# from rest_framework.response import Response
# from sqlalchemy import create_engine
# from rest_framework import status
# from .models import ArchivoTrabajadores
# from core.distributivo.models import *
# from core.trabajadores.models import *
# #from app.config.db import POSTGRESQL
# from django.conf import settings

# def analisis_trabajadores():
#     database_settings = settings.DATABASES['default']
#     engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")

#     documento = ArchivoTrabajadores.objects.latest('id').doc
#     distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)}, dtype={'cod_unidad_organica': str, 'cod_denominacion_puesto': str,'cod_regimen': str,'cod_modalidad': str,'nivel_ocupacional': str,'estructura_programatica': str, 'grado': str,})

#     documento = ArchivoTrabajadores.objects.latest('id').doc
#     distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)})
#     id_doc = ArchivoTrabajadores.objects.latest('id').id  # permite obtener el id del documento

#     success_message = []
#     error_messages= []
#     cedula = 'numero_identificacion' in distributivo.columns

#     try:
#         if cedula:
#              # permite la creacion de una nueva columna
#             distributivo['id_unidad_organica_id'] = ''
#             distributivo['id_denominacion_puesto_id'] = ''
#             distributivo['id_regimen_laboral_id'] = ''
#             distributivo['id_nivel_ocupacional_id'] = ''
#             distributivo['id_modalidad_laboral_id'] = ''
#             distributivo['id_estructura_programatica_id'] = ''
#             distributivo['id_escala_ocupacional_id'] = ''
#             distributivo['id_grado_id'] = ''
#             distributivo['state'] = 'True'
#             distributivo['celular'] = ''

#             cedula = distributivo['numero_identificacion']
#             codigoUnidad = distributivo['cod_unidad_organica']
#             codigoDenominacion = distributivo['cod_denominacion_puesto']
#             codigoRegimen = distributivo['cod_regimen']
#             codigoModalidad = distributivo['cod_modalidad']
#             codigoNivel = distributivo['nivel_ocupacional']
#             codigoPartida = distributivo['estructura_programatica']
#             escalaOcupacional = distributivo['cod_escala_ocupacional']
#             codigoGrado = distributivo['grado']
            
#             distributivo['fecha_inicio'] = pd.to_datetime(distributivo['fecha_inicio'], format='%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
#             distributivo['fecha_fin'] = pd.to_datetime(distributivo['fecha_fin'], format='%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
#             distributivo.fillna('', inplace=True)
#         # listaRegimen = Unidad_Organica.objects.all().filter(cod_unidad=codigoUnidad)
#             for gra in codigoGrado:
#                 grados = Grado.objects.all().filter(grado=gra)
#                 if grados:
#                     cod_gra = grados.get().grado
#                     id_gra = grados.get().id
#                     # Cambia esta línea para coincidir con los datos del DataFrame
#                     distributivo.loc[distributivo['grado'].astype(str) == str(gra), 'id_grado_id'] = id_gra
#                 else:
#                     error_messages.append('Error en el codigo del grado:  {}'.format(gra))



#             for denomi in codigoDenominacion:
#                 denominacion = Denominacion_Puesto.objects.all().filter(cod_denominacion_puesto=denomi)
#                 if denominacion:
#                     cod_denominacion = denominacion.get().cod_denominacion_puesto
#                     id_denominacion = denominacion.get().id
#                     distributivo.loc[distributivo['cod_denominacion_puesto'] == cod_denominacion, 'id_denominacion_puesto_id'] = id_denominacion
#                     # print(distributivo.loc[distributivo['cod_denominacion_puesto'] == cod_denominacion])
#                 else:
#                     error_messages.append('Error en el codigo de la denominacion del puesto: {}'.format(denomi))
                    
#             for codigo in codigoUnidad:
#                 unidad= Unidad_Organica.objects.all().filter(cod_unidad = codigo)
#                 if unidad: 
#                     cod_unid= unidad.get().unidad_organica
#                     id_unid = unidad.get().id
#                     distributivo.loc[distributivo['unidad_organica'] == cod_unid, 'id_unidad_organica_id']= id_unid
#                 else:
#                    error_messages.append('Error en el codigo de unidad organica:  {}'.format(codigo))

#             for reg in codigoRegimen:
#                 regimen = Regimen_Laboral.objects.all().filter(cod_regimen=reg)
#                 if regimen:
#                     cod_reg = regimen.get().regimen_laboral
#                     id_reg = regimen.get().id
#                     distributivo.loc[distributivo['regimen_laboral'] == cod_reg, 'id_regimen_laboral_id'] = id_reg
#                 else:
#                     error_messages.append('Error en el código de régimen laboral:  {}'.format(reg))

#             for niv in codigoNivel:
#                 nivel = Nivel_Ocupacional.objects.all().filter(nivel_ocupacional=niv)
#                 if nivel:
#                     cod_niv = nivel.get().nivel_ocupacional
#                     id_niv = nivel.get().id
#                     distributivo.loc[distributivo['nivel_ocupacional'] == cod_niv, 'id_nivel_ocupacional_id'] = id_niv
#                 else:
#                     error_messages.append('Error en el codigo del nivel ocupacional {}'.format(niv))

#             for escala in escalaOcupacional:
#                 escala = Escala_Ocupacional.objects.all().filter(cod_escala_ocupacional=escala)
#                 if escala:
#                     cod_escala = escala.get().escala_ocupacional
#                     id_escala = escala.get().id
#                     distributivo.loc[distributivo['escala_ocupacional'] == cod_escala, 'id_escala_ocupacional_id'] = id_escala
#                 else:
#                     error_messages.append('Error en la escala ocupacional {}'.format(escala))      

#             for mod in codigoModalidad:
#                 modalidad = Modalidad_Laboral.objects.all().filter(cod_modalidad=mod)
#                 if modalidad:
#                     cod_mod = modalidad.get().modalidad_laboral
#                     id_mod = modalidad.get().id
#                     distributivo.loc[distributivo['modalidad_laboral'] == cod_mod, 'id_modalidad_laboral_id'] = id_mod
#                 else:
#                     error_messages.append('Error en el codigo de la modalidad laboral:  {}'.format(mod))

#             for par in codigoPartida:
#                 partida = Estructura_Programatica.objects.all().filter(estructura_programatica=par)
#                 if partida:
#                     cod_par = partida.get().estructura_programatica
#                     id_par = partida.get().id
#                     distributivo.loc[distributivo['estructura_programatica'] == cod_par, 'id_estructura_programatica_id'] = id_par
#                 else:
#                     error_messages.append('Error en el codigo de la partida programatica:  {}'.format(par))
            


#             nuevodf = distributivo.copy()  

#             for ced in cedula:
#                 servidores = Trabajador.objects.all().filter(numero_identificacion = ced)
#                 if servidores:
#                     for servidor in servidores:
#                         # Filtrar el DataFrame distributivo por número de identificación
#                         fila = distributivo[distributivo['numero_identificacion'] == ced]

#                         # Actualizar los campos del trabajador con los valores de la fila del DataFrame
#                         servidor.partida_individual = fila['partida_individual'].iloc[0]
#                         servidor.id_unidad_organica_id = fila['id_unidad_organica_id'].iloc[0]
#                         servidor.id_denominacion_puesto_id = fila['id_denominacion_puesto_id'].iloc[0]
#                         servidor.id_estructura_programatica_id = fila['id_estructura_programatica_id'].iloc[0]
#                         servidor.id_regimen_laboral_id = fila['id_regimen_laboral_id'].iloc[0]
#                         servidor.id_nivel_ocupacional_id = fila['id_nivel_ocupacional_id'].iloc[0]
#                         servidor.id_modalidad_laboral_id = fila['id_modalidad_laboral_id'].iloc[0]
#                         servidor.id_grado_id = fila['id_grado_id'].iloc[0]
#                         servidor.id_escala_ocupacional_id = fila['id_escala_ocupacional_id'].iloc[0]
#                         servidor.numero_identificacion = fila['numero_identificacion'].iloc[0]
#                         servidor.rmu_puesto = fila['rmu_puesto'].iloc[0]
#                         servidor.nombres = fila['nombres'].iloc[0]
#                         servidor.celular = fila['celular'].iloc[0]
#                         servidor.state = fila['state'].iloc[0]
#                         servidor.estado_servidor = fila['estado_servidor'].iloc[0]
#                         #servidor.dias_vacaciones = fila['dias_vacaciones'].iloc[0]
#                         servidor.fecha_inicio = fila['fecha_inicio'].iloc[0]
#                         servidor.fecha_fin = fila['fecha_fin'].iloc[0]
#                         #servidor.correo_institucional = fila['correo_institucional'].iloc[0]
#                         # Guardar los cambios en la base de datos
#                         servidor.save()
#                         nuevodf = nuevodf.drop(nuevodf[nuevodf['numero_identificacion'] == ced].index)
                   
#                 else:
#                     #error_messages.append('EL servidor no esta en la base de datos:  {}'.format(ced))
#                     pass
#             nuevoDocumento = nuevodf[[
#                 'id_unidad_organica_id',
#                 'id_denominacion_puesto_id',
#                 'id_estructura_programatica_id',
#                 'id_regimen_laboral_id',
#                 'id_nivel_ocupacional_id',
#                 'id_modalidad_laboral_id',
#                 'id_escala_ocupacional_id',
#                 'id_grado_id',
#                 'numero_identificacion',
#                 'tipo_identificacion',
#                 'partida_individual',
#                 'fecha_inicio',
#                 'fecha_fin',
#                 'rmu_puesto',
#                 'nombres',
#                 'celular',
#                 'state',
#                 'estado_servidor',
#                 #'dias_vacaciones',
#                 #'correo_institucional',
#             ]]
#             #print(nuevoDocumento)
#             # distributivo.to_excel('archivo_salida.xlsx', index=False, engine='openpyxl')
#             nuevodf.to_sql('Trabajador', engine, if_exists='append', index=False)
#             success_message.append('El documento se ha guardado correctamente')
#         else:
#             error_messages.append('El documento no se ha guardado correctamente')
#     except Exception as e:
#         error_messages.append(str(e))  # Append the exception message to the list

#     #Se maneja el envio de errores para alertas
#     if len(error_messages) > 0:
#         return error_messages
#     elif len(success_message) > 0 :
#         return success_message




