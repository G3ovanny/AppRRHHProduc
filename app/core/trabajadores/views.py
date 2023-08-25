import pandas as pd
import psycopg2
from rest_framework.response import Response
from sqlalchemy import create_engine
from rest_framework import status
from .models import ArchivoTrabajadores
from core.distributivo.models import *
from core.trabajadores.models import *


def analisis_trabajadores():
    engine = create_engine(

        'postgresql+psycopg2://postgres:admin@localhost:5432/TalentoHumano_db')
    # engine = create_engine('postgresql+psycopg2://phhlodnsitnoam:965304b8f993a45fd005b0515bcdc205c4672180d6a2aab7304ab98d448ad887@ec2-3-219-111-26.compute-1.amazonaws.com:5432/d85gt08imns7s2')

    documento = ArchivoTrabajadores.objects.latest('id').doc
    distributivo = pd.read_excel(documento, index_col=False, converters={'numero_identificacion': lambda x: str(x)}, dtype={'cod_unidad_organica': str, 'cod_denominacion_puesto': str,'cod_regimen': str,'cod_modalidad': str,'nivel_ocupacional': str,'estructura_programatica': str})

    # engine = create_engine('postgresql+psycopg2://phhlodnsitnoam:965304b8f993a45fd005b0515bcdc205c4672180d6a2aab7304ab98d448ad887@ec2-3-219-111-26.compute-1.amazonaws.com:5432/d85gt08imns7s2')

    documento = ArchivoTrabajadores.objects.latest('id').doc
    distributivo = pd.read_excel(documento, index_col=False, converters={
                                 'numero_identificacion': lambda x: str(x)})
    id_doc = ArchivoTrabajadores.objects.latest('id').id  # permite obtener el id del documento

    cedula = 'numero_identificacion' in distributivo.columns
    try:
        if cedula:
            # permite la creacion de una nueva columna
            distributivo['id_unidad_organica_id'] = ' '
            distributivo['id_denominacion_puesto_id'] = ' '
            distributivo['id_regimen_laboral_id'] = ' '
            distributivo['id_nivel_ocupacional_id'] = ' '
            distributivo['id_modalidad_laboral_id'] = ' '
            distributivo['id_estructura_programatica_id'] = ' '
            distributivo['state'] = 'True'
            distributivo['celular'] = ''
            distributivo['dias_vacaciones']
        
            #distributivo['dias_vacaciones'] = ''
            cedula = distributivo['numero_identificacion']
            codigoUnidad = distributivo['cod_unidad_organica']
            codigoDenominacion = distributivo['cod_denominacion_puesto']
            codigoRegimen = distributivo['cod_regimen']
            codigoModalidad = distributivo['cod_modalidad']
            codigoNivel = distributivo['nivel_ocupacional']
            codigoPartida = distributivo['estructura_programatica']

        # listaRegimen = Unidad_Organica.objects.all().filter(cod_unidad=codigoUnidad)

            for codigo in codigoUnidad:
                unidad = Unidad_Organica.objects.all().filter(cod_unidad=codigo)
                if unidad:
                    cod_unidad = unidad.get().cod_unidad
                    id_unidad = unidad.get().id
                    # print('unidad', id_unidad)
                    distributivo.loc[distributivo['cod_unidad_organica']== cod_unidad, 'id_unidad_organica_id'] = id_unidad
                else:
                    return Response({'Error en el codigo de unidad organica: ', codigo})
                    #print('Error en el codigo de unidad organica: ', codigo)

            for denomi in codigoDenominacion:
                denominacion = Denominacion_Puesto.objects.all().filter(cod_denominacion_puesto=denomi)
                if denominacion:
                    cod_denominacion = denominacion.get().cod_denominacion_puesto
                    id_denominacion = denominacion.get().id
                    distributivo.loc[distributivo['cod_denominacion_puesto'] == cod_denominacion, 'id_denominacion_puesto_id'] = id_denominacion
                else:
                    return Response({'Error en el codigo de la denominacion del puesto', denomi})

            for reg in codigoRegimen:
                regimen = Regimen_Laboral.objects.all().filter(cod_regimen=reg)
                if regimen:
                    cod_reg = regimen.get().regimen_laboral
                    id_reg = regimen.get().id
                    distributivo.loc[distributivo['regimen_laboral']
                                    == cod_reg, 'id_regimen_laboral_id'] = id_reg
                else:
                    return Response({'Error en el código de régimen laboral: ', reg})

            for niv in codigoNivel:
                nivel = Nivel_Ocupacional.objects.all().filter(nivel_ocupacional=niv)
                if nivel:
                    cod_niv = nivel.get().nivel_ocupacional
                    id_niv = nivel.get().id
                    distributivo.loc[distributivo['nivel_ocupacional']
                                    == cod_niv, 'id_nivel_ocupacional_id'] = id_niv
                else:
                    return Response({'Error en el codigo del nivel ocupacional', niv})
            for mod in codigoModalidad:
                modalidad = Modalidad_Laboral.objects.all().filter(cod_modalidad=mod)
                if modalidad:
                    cod_mod = modalidad.get().modalidad_laboral
                    id_mod = modalidad.get().id
                    distributivo.loc[distributivo['modalidad_laboral']
                                     == cod_mod, 'id_modalidad_laboral_id'] = id_mod
                else:
                    return Response({'Error en el codigo de la modalidad laboral: ', mod})

            for par in codigoPartida:
                partida = Estructura_Programatica.objects.all().filter(estructura_programatica=par)
                if partida:
                    cod_par = partida.get().estructura_programatica
                    id_par = partida.get().id
                    distributivo.loc[distributivo['estructura_programatica']
                                    == cod_par, 'id_estructura_programatica_id'] = id_par
                else:
                    print('Error en el codigo de la partida programatica: ', par)


            for ced in cedula:
                servidor = Trabajador.objects.all().filter(numero_identificacion = ced)
                if servidor:
                    print('El servidor existe')
                else:
                    print('El servidor no existe')
            
            asd = distributivo['dias_vacaciones']
            print(asd)
            # nuevoDocumento = distributivo[[
            #     'tipo_identificacion',
            #     'partida_individual',
            #     'id_unidad_organica_id',
            #     'id_denominacion_puesto_id',
            #     'id_estructura_programatica_id',
            #     'id_regimen_laboral_id',
            #     'id_nivel_ocupacional_id',
            #     'id_modalidad_laboral_id',
            #     'numero_identificacion',
            #     'rmu_puesto',
            #     'nombres',
            #     'celular',
            #     'state',
            #     'estado_servidor',
            #     'dias_vacaciones',
            # ]]
            # print(nuevoDocumento)
            #nuevoDocumento.to_sql('Trabajador', engine, if_exists='fail', index=False)
            return Response({'mensaje': 'El documento se ha guardado correctamente'})
        else:
            return Response({'mensaje': 'El documento no se ha guardado correctamente'})
    except Exception as e:
        print("Proceso terminado: {}".format(e))
