import pandas as pd
from rest_framework.response import Response
from sqlalchemy import create_engine

from .models import ArchivoAcciones
from .models import AccionPersonal
from ..trabajadores.models import Trabajador
# Create your views here.

#me permite generar acciones de personal de forma masiva utilizando la libria pandas#
def analisis_Archivo():
    engine = create_engine(
        'postgresql+psycopg2://postgres:admin123@localhost:5432/TalentoHumano_db')

    documento = ArchivoAcciones.objects.latest('id').doc
    docAcciones = pd.read_excel(documento, index_col=False, converters={
                                'numero_identificacion': lambda x: str(x)})
    cedula = 'numero_identificacion' in docAcciones.columns

    explic = 'En función de lo dispuesto en el literar gj del Art. 23 de la LOSEP, en concordancia con los Art. 20 y 30 del Reglamento de la misma Ley, se consede el uso de vacaciones mismas que estaran formadas desde el'

    if cedula:
        docAcciones['id_trabajador_id'] = ' '
        docAcciones['estado_accion'] = 'VIGENTE'
        docAcciones['explicacion'] = ''
        docAcciones['state'] = 'True'
        docAcciones['tipo_accion'] = 'VACACIONES'

        cedula = docAcciones['numero_identificacion']

        for ced in cedula:
            trabajador = Trabajador.objects.all().filter(numero_identificacion=ced)
            ced_trabajador = trabajador.get().numero_identificacion
            id_trab = trabajador.get().id
            fecha_salida = docAcciones['fecha_salida'].astype(str)
            fecha_retorno = docAcciones['fecha_salida'].astype(str)
            docAcciones['explicacion'] = explic + \
                ' ' + fecha_salida + ' ' + fecha_retorno
            docAcciones.loc[docAcciones['numero_identificacion']
                            == ced_trabajador, 'id_trabajador_id'] = id_trab

        docAcciones.drop('numero_identificacion', axis=1,  inplace=True)
        docAcciones.drop('fecha_salida', axis=1,  inplace=True)
        docAcciones.drop('fecha_retorno', axis=1,  inplace=True)

        docAcciones.to_sql('Accion_personal', engine,
                           if_exists='append', index=False)

        return Response({'mensaje': 'El documento se ha guardado correctamente'})
    else:
        return Response({'mensaje': 'El documento no se ha guardado correctamente'})
