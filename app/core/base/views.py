from django.shortcuts import render
from django.conf import settings
# Create your views here.


def base_view(request):
    debug_mode = settings.DEBUG
    return render(request, 'base.html', {'debug_mode': debug_mode})