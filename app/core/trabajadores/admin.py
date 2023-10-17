from django.contrib import admin
from .tests import *
from .models import *
# Register your models here.

@admin.register(Trabajador)
class Trabajador_Admin(admin.ModelAdmin):
    list_display=('id', 'numero_identificacion', 'nombres', 'id_unidad_organica', 'state',)
    search_fields = ('id','numero_identificacion', 'nombres')
    list_filter = ('id','numero_identificacion', 'nombres')


@admin.register(ArchivoTrabajadores)
class ArchivoTrabajador_Admin(admin.ModelAdmin):
    list_display=('id', 'doc')


#send_form()