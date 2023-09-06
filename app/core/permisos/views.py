from django.shortcuts import render
from rest_framework.generics import GenericAPIView

# Create your views here.


class PermisoAA(GenericAPIView):
    
    def get(self, request, *args, **kwargs):
        print('acceso')