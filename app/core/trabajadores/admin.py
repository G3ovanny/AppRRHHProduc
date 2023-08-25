from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(Trabajador)
class Trabajador_Admin(admin.ModelAdmin):
    list_display=('id', 'nombres')

@admin.register(ArchivoTrabajadores)
class ArchivoTrabajador_Admin(admin.ModelAdmin):
    list_display=('id', 'doc')