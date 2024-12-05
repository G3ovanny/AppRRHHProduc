import pandas as pd
from rest_framework.response import Response
from sqlalchemy import create_engine
from rest_framework import status
from .models import ArchivoTrabajadores
from core.distributivo.models import *
from core.trabajadores.models import *
#from app.config.db import POSTGRESQL
from django.conf import settings

def analisis_trabajadores():
    database_settings = settings.DATABASES['default']
    engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")

    documento = ArchivoTrabajadores.objects.latest('id').doc
    distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)}, dtype={'cod_unidad_organica': str, 'cod_denominacion_puesto': str,'cod_regimen': str,'cod_modalidad': str,'nivel_ocupacional': str,'estructura_programatica': str, 'grado': str,})

    documento = ArchivoTrabajadores.objects.latest('id').doc
    distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)})
    id_doc = ArchivoTrabajadores.objects.latest('id').id  # permite obtener el id del documento

    success_message = []
    error_messages= []
    cedula = 'numero_identificacion' in distributivo.columns

    try:
        if cedula:
             # permite la creacion de una nueva columna
            distributivo['id_unidad_organica_id'] = ''
            distributivo['id_denominacion_puesto_id'] = ''
            distributivo['id_regimen_laboral_id'] = ''
            distributivo['id_nivel_ocupacional_id'] = ''
            distributivo['id_modalidad_laboral_id'] = ''
            distributivo['id_estructura_programatica_id'] = ''
            distributivo['id_escala_ocupacional_id'] = ''
            distributivo['id_grado_id'] = ''
            distributivo['state'] = 'True'
            distributivo['celular'] = ''

            cedula = distributivo['numero_identificacion']
            codigoUnidad = distributivo['cod_unidad_organica']
            codigoDenominacion = distributivo['cod_denominacion_puesto']
            codigoRegimen = distributivo['cod_regimen']
            codigoModalidad = distributivo['cod_modalidad']
            codigoNivel = distributivo['nivel_ocupacional']
            codigoPartida = distributivo['estructura_programatica']
            escalaOcupacional = distributivo['cod_escala_ocupacional']
            codigoGrado = distributivo['grado']
            
            distributivo['fecha_inicio'] = pd.to_datetime(distributivo['fecha_inicio'], format='%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
            distributivo['fecha_fin'] = pd.to_datetime(distributivo['fecha_fin'], format='%d/%m/%Y %H:%M:%S').dt.strftime('%Y-%m-%d')
            distributivo.fillna('', inplace=True)
        # listaRegimen = Unidad_Organica.objects.all().filter(cod_unidad=codigoUnidad)
            for gra in codigoGrado:
                grados = Grado.objects.all().filter(grado=gra)
                if grados:
                    cod_gra = grados.get().grado
                    id_gra = grados.get().id
                    # Cambia esta línea para coincidir con los datos del DataFrame
                    distributivo.loc[distributivo['grado'].astype(str) == str(gra), 'id_grado_id'] = id_gra
                else:
                    error_messages.append('Error en el codigo del grado:  {}'.format(gra))



            for denomi in codigoDenominacion:
                denominacion = Denominacion_Puesto.objects.all().filter(cod_denominacion_puesto=denomi)
                if denominacion:
                    cod_denominacion = denominacion.get().cod_denominacion_puesto
                    id_denominacion = denominacion.get().id
                    distributivo.loc[distributivo['cod_denominacion_puesto'] == cod_denominacion, 'id_denominacion_puesto_id'] = id_denominacion
                    # print(distributivo.loc[distributivo['cod_denominacion_puesto'] == cod_denominacion])
                else:
                    error_messages.append('Error en el codigo de la denominacion del puesto: {}'.format(denomi))
                    
            for codigo in codigoUnidad:
                unidad= Unidad_Organica.objects.all().filter(cod_unidad = codigo)
                if unidad: 
                    cod_unid= unidad.get().unidad_organica
                    id_unid = unidad.get().id
                    distributivo.loc[distributivo['unidad_organica'] == cod_unid, 'id_unidad_organica_id']= id_unid
                else:
                   error_messages.append('Error en el codigo de unidad organica:  {}'.format(codigo))

            for reg in codigoRegimen:
                regimen = Regimen_Laboral.objects.all().filter(cod_regimen=reg)
                if regimen:
                    cod_reg = regimen.get().regimen_laboral
                    id_reg = regimen.get().id
                    distributivo.loc[distributivo['regimen_laboral'] == cod_reg, 'id_regimen_laboral_id'] = id_reg
                else:
                    error_messages.append('Error en el código de régimen laboral:  {}'.format(reg))

            for niv in codigoNivel:
                nivel = Nivel_Ocupacional.objects.all().filter(nivel_ocupacional=niv)
                if nivel:
                    cod_niv = nivel.get().nivel_ocupacional
                    id_niv = nivel.get().id
                    distributivo.loc[distributivo['nivel_ocupacional'] == cod_niv, 'id_nivel_ocupacional_id'] = id_niv
                else:
                    error_messages.append('Error en el codigo del nivel ocupacional {}'.format(niv))

            for escala in escalaOcupacional:
                escala = Escala_Ocupacional.objects.all().filter(cod_escala_ocupacional=escala)
                if escala:
                    cod_escala = escala.get().escala_ocupacional
                    id_escala = escala.get().id
                    distributivo.loc[distributivo['escala_ocupacional'] == cod_escala, 'id_escala_ocupacional_id'] = id_escala
                else:
                    error_messages.append('Error en la escala ocupacional {}'.format(escala))      

            for mod in codigoModalidad:
                modalidad = Modalidad_Laboral.objects.all().filter(cod_modalidad=mod)
                if modalidad:
                    cod_mod = modalidad.get().modalidad_laboral
                    id_mod = modalidad.get().id
                    distributivo.loc[distributivo['modalidad_laboral'] == cod_mod, 'id_modalidad_laboral_id'] = id_mod
                else:
                    error_messages.append('Error en el codigo de la modalidad laboral:  {}'.format(mod))

            for par in codigoPartida:
                partida = Estructura_Programatica.objects.all().filter(estructura_programatica=par)
                if partida:
                    cod_par = partida.get().estructura_programatica
                    id_par = partida.get().id
                    distributivo.loc[distributivo['estructura_programatica'] == cod_par, 'id_estructura_programatica_id'] = id_par
                else:
                    error_messages.append('Error en el codigo de la partida programatica:  {}'.format(par))
            


            nuevodf = distributivo.copy()  

            for ced in cedula:
                servidores = Trabajador.objects.all().filter(numero_identificacion = ced)
                if servidores:
                    for servidor in servidores:
                        # Filtrar el DataFrame distributivo por número de identificación
                        fila = distributivo[distributivo['numero_identificacion'] == ced]

                        # Actualizar los campos del trabajador con los valores de la fila del DataFrame
                        servidor.partida_individual = fila['partida_individual'].iloc[0]
                        servidor.id_unidad_organica_id = fila['id_unidad_organica_id'].iloc[0]
                        servidor.id_denominacion_puesto_id = fila['id_denominacion_puesto_id'].iloc[0]
                        servidor.id_estructura_programatica_id = fila['id_estructura_programatica_id'].iloc[0]
                        servidor.id_regimen_laboral_id = fila['id_regimen_laboral_id'].iloc[0]
                        servidor.id_nivel_ocupacional_id = fila['id_nivel_ocupacional_id'].iloc[0]
                        servidor.id_modalidad_laboral_id = fila['id_modalidad_laboral_id'].iloc[0]
                        servidor.id_grado_id = fila['id_grado_id'].iloc[0]
                        servidor.id_escala_ocupacional_id = fila['id_escala_ocupacional_id'].iloc[0]
                        servidor.numero_identificacion = fila['numero_identificacion'].iloc[0]
                        servidor.rmu_puesto = fila['rmu_puesto'].iloc[0]
                        servidor.nombres = fila['nombres'].iloc[0]
                        servidor.celular = fila['celular'].iloc[0]
                        servidor.state = fila['state'].iloc[0]
                        servidor.estado_servidor = fila['estado_servidor'].iloc[0]
                        #servidor.dias_vacaciones = fila['dias_vacaciones'].iloc[0]
                        servidor.fecha_inicio = fila['fecha_inicio'].iloc[0]
                        servidor.fecha_fin = fila['fecha_fin'].iloc[0]
                        #servidor.correo_institucional = fila['correo_institucional'].iloc[0]
                        # Guardar los cambios en la base de datos
                        servidor.save()
                        nuevodf = nuevodf.drop(nuevodf[nuevodf['numero_identificacion'] == ced].index)
                   
                else:
                    #error_messages.append('EL servidor no esta en la base de datos:  {}'.format(ced))
                    pass
            nuevoDocumento = nuevodf[[
                'id_unidad_organica_id',
                'id_denominacion_puesto_id',
                'id_estructura_programatica_id',
                'id_regimen_laboral_id',
                'id_nivel_ocupacional_id',
                'id_modalidad_laboral_id',
                'id_escala_ocupacional_id',
                'id_grado_id',
                'numero_identificacion',
                'tipo_identificacion',
                'partida_individual',
                'fecha_inicio',
                'fecha_fin',
                'rmu_puesto',
                'nombres',
                'celular',
                'state',
                'estado_servidor',
                #'dias_vacaciones',
                #'correo_institucional',
            ]]
            #print(nuevoDocumento)
            # distributivo.to_excel('archivo_salida.xlsx', index=False, engine='openpyxl')
            nuevodf.to_sql('Trabajador', engine, if_exists='append', index=False)
            success_message.append('El documento se ha guardado correctamente')
        else:
            error_messages.append('El documento no se ha guardado correctamente')
    except Exception as e:
        error_messages.append(str(e))  # Append the exception message to the list

    #Se maneja el envio de errores para alertas
    if len(error_messages) > 0:
        return error_messages
    elif len(success_message) > 0 :
        return success_message

