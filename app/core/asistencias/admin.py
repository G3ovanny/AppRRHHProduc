from django.contrib import admin

from ..asistencias.models import Asistencia
from .models import *

@admin.register(Asistencia)
class Asistencia_Admin(admin.ModelAdmin):
    list_display=('id', 'id_trabajador', 'fecha_registro')