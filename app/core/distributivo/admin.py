from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Denominacion_Puesto)
class DenominacionPuesto_Admin(admin.ModelAdmin):
    list_display= ('id', 'cod_denominacion_puesto', 'denominacion_puesto')

@admin.register(Estructura_Programatica)
class EstruecturaProgramatica_Admin(admin.ModelAdmin):
    list_display= ('id', 'estructura_programatica')

@admin.register(Modalidad_Laboral)
class ModalidadLaboral_Admin(admin.ModelAdmin):
    list_display= ('id', 'cod_modalidad', 'modalidad_laboral')

@admin.register(Nivel_Ocupacional)
class NivelOcupacional_Admin(admin.ModelAdmin):
    list_display= ('id','cod_nivel_ocupacional', 'nivel_ocupacional')

@admin.register(Proceso)
class Proceso_Admin(admin.ModelAdmin):
    list_display= ('id', 'proceso')

@admin.register(Regimen_Laboral)
class RegimenLaboral_Admin(admin.ModelAdmin):
    list_display= ('id','cod_regimen', 'regimen_laboral')

@admin.register(Unidad_Organica)
class UnidadOrganica_Admin(admin.ModelAdmin):
    list_display= ('id', 'cod_unidad', 'unidad_organica')
