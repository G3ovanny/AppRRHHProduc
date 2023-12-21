from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(AccionPersonal)
class AccionPersonal_Admin(admin.ModelAdmin):
    list_display=('id', 'tipo_accion', 'contador', 'estado_accion')