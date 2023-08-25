from django.contrib import admin

# Register your models here.

from .models import *

@admin.register(Usuario)
class Usuario_Admin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    #search_fields = ('nombre')
    #list_filter = ('nombre')