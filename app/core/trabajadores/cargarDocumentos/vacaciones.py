import pandas as pd
import numpy as np
from core.trabajadores.models import VacacionesTrabajadores
from core.trabajadores.models import Trabajador
from rest_framework.response import Response
from rest_framework import status

def analisis_vacaciones():
        # database_settings = POSTGRESQL['default']
    # engine = create_engine(f"postgresql+psycopg2://{database_settings['USER']}:{database_settings['PASSWORD']}@{database_settings['HOST']}:{database_settings['PORT']}/{database_settings['NAME']}")
    documento = VacacionesTrabajadores.objects.latest('id').doc
    documento =  pd.read_excel(documento, index_col=False, converters= {'numero_identificacion': lambda x: str(x)})
    documento['dias_vacaciones'].replace({np.nan: ''}, inplace=True)
    documento['dias_vacaciones'] = documento['dias_vacaciones'].astype(float)
    
    success_message = []
    error_messages = []
    cedula = 'numero_identificacion' in documento.columns
    try:
        if cedula:
            cedulas = documento['numero_identificacion']
            for ced in cedulas:
                servidores =  Trabajador.objects.all().filter(numero_identificacion = ced)
                if (servidores.count() > 0):
                    for servidor in servidores:
                        fila = documento[documento['numero_identificacion'] == ced]
                        servidor.dias_vacaciones = fila['dias_vacaciones'].iloc[0]
                        servidor.save()
                else:
                    error_messages.append(f"No se encontro al servidor con el número de cédula: {ced} sus datos no se actualizaron")
                    
            success_message.append('El documento se ha guardado correctamente')
        else:
            error_messages.append('El documento no se ha guardado correctamente')

    except Exception as e:
        error_messages.append(str(e))
    
    if len(error_messages) > 0:
        return error_messages
    elif len(success_message) > 0 :
        return success_message
#     process_error_messages(error_messages)

#     return error_messages

# # Define the function to process error messages
# def process_error_messages(errors):
#     if errors:
#         # You can choose how to format and return the error messages here
#         error_response = {'errors': errors}
#         # Call another function to return the response to the client
#         return send_response(error_response)
#     else:
#         # If no errors, return a success response
#         return Response({'message': 'Success'})

# # Define a function to send the response to the client
# def send_response(response_data):
#     # Here, you can customize how you want to return the response to the client
#     # You can use the Response class or any other method that suits your API
#     return Response(response_data, status=status.HTTP_400_BAD_REQUEST)  