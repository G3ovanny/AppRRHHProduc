import django.core.mail
from django.core.mail import send_mail, send_mass_mail
from django.test import TestCase
from app.config import settings
from django.shortcuts import render
from django.http import HttpResponse

# Create your tests here.


def generar_enlace(request):
    enlace = "http://localhost:5173/enlace_formulario"
    print(request)
    return HttpResponse(enlace)
    
def send_form():
    correo_desde = 'jeffersonlara98@gmail.com'
    correo_hasta = ['jefferson.lara@upec.edu.ec']
    try:
        subject = 'Envio de formulario'
        #recipient_list = correo_hasta
        #email_from = settings.EMAIL_HOST_USER
        mensaje_form = "http://localhost:5173/enlace_formulario"
        
        send_mail(
            subject,
            mensaje_form,
            correo_desde,
            correo_hasta,
            fail_silently=False)
    except Exception as e:
        print(e)
