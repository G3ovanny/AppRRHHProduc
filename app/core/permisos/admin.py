from django.contrib import admin

from .models import *
# Register your models here.

@admin.register(MotivoPermiso)
class MotivoPermiso_Admin(admin.ModelAdmin):
    list_display=('id', 'motivo')


@admin.register(Permiso)
class Permiso_Admin(admin.ModelAdmin):
    list_display=('id', 'id_trabajador','fecha_hora_salida','fecha_hora_llegada','detalle')
    search_fields = ('id','id_trabajador', 'id_motivo')
    list_filter = ('id','id_trabajador', 'id_motivo')
