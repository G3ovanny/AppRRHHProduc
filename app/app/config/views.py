from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    react_html = render(request, 'index.html')
    return HttpResponse(react_html)


