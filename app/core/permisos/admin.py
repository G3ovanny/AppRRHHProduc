from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(MotivoPermiso)
class MotivoPermiso_Admin(admin.ModelAdmin):
    list_display=('id', 'motivo')


@admin.register(Permiso)
class Permiso_Admin(admin.ModelAdmin):
    list_display=('id', 'fecha_hora_salida','fecha_hora_llegada','detalle')
