from django.contrib import admin

from .models import *
# Register your models here.


@admin.register(CronogramaVacaciones)
class Cronograma_vacaciones(admin.ModelAdmin):
    list_display = ('id', 'id_trabajador')
    search_fields = ('id', 'id_trabajador')
