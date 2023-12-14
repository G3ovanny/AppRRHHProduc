import django.core.mail
from django.core.mail import send_mail, send_mass_mail
from django.test import TestCase
from app.config import settings
from django.shortcuts import render
from django.http import HttpResponse
from core.trabajadores.models import Trabajador
from rest_framework.response import Response
from rest_framework import status
# Create your tests here.
def generar_enlace(request):
    enlace = "http://http://10.100.100.146:85//enlace_formulario"
    print(request)
    return HttpResponse(enlace)
    
def send_link(trabajador):
    servidor= trabajador[0]
    correoInstitucional = servidor.correo_institucional
    correo_desde = 'talento.humano@upec.edu.ec'
    #correoInstitucional = ['jefferson.lara@upec.edu.ec']
    mensajesError=[]
    try:
        if correoInstitucional:
            subject = 'Envio de formulario'
            #recipient_list = correoInstitucional
            #email_from = settings.EMAIL_HOST_USER
            mensaje_form = "http://http://10.100.100.146:85//enlace_formulario"
            
            send_mail(
                subject,
                mensaje_form,
                correo_desde,
                [correoInstitucional],
                fail_silently=False)
        else:
            mensajesError.append('El servidor no cuenta con un correo institucional')
    except Exception as e:
        mensajesError.append(str(e))

    process_mensajesError(mensajesError)

    return mensajesError

# Define the function to process error messages
def process_mensajesError(errors):
    if errors:
        # You can choose how to format and return the error messages here
        error_response = {'errors': errors}
        # Call another function to return the response to the client
        return send_response(error_response)
    else:
        # If no errors, return a success response
        return Response({'message': 'Success'})

# Define a function to send the response to the client
def send_response(response_data):
    # Here, you can customize how you want to return the response to the client
    # You can use the Response class or any other method that suits your API
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)  # Example: Returning a 400 status code
