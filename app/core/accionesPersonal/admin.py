from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(AccionPersonal)
class AccionPersonal_Admin(admin.ModelAdmin):
    list_display=('id', 'id_trabajador', 'tipo_accion', 'contador', 'estado_accion','state')
    search_fields=('id', 'id_trabajador', 'tipo_accion', 'contador', 'estado_accion', 'state')