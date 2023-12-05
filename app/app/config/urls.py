from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.static import serve
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from core.usuarios.views import Login, Logout
from core.trabajadores.api.views.datosFormulario_views import DatosFormulario

from core.permisos.views import PermisoAA
from core.trabajadores.envioCorreo.envio_correo_datos import EnvioDatos
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", TemplateView.as_view(template_name = 'base.html')),
    path("enlace_formulario", TemplateView.as_view(template_name = 'base.html')),
    path("enlace_formularios", TemplateView.as_view(template_name = 'base.html')),
    path("dashboard", TemplateView.as_view(template_name = 'base.html')),
    path("perfil", TemplateView.as_view(template_name = 'base.html')),
    path("distributivo", TemplateView.as_view(template_name = 'base.html')),
    path("servidores", TemplateView.as_view(template_name = 'base.html')),
    path("datos_servidores", TemplateView.as_view(template_name = 'base.html')),
    path("permisos", TemplateView.as_view(template_name = 'base.html')),
    path("motivo", TemplateView.as_view(template_name = 'base.html')),
    path("acciones-personal", TemplateView.as_view(template_name = 'base.html')),
    path("cronograma", TemplateView.as_view(template_name = 'base.html')),
    path("asistencia", TemplateView.as_view(template_name = 'base.html')),
    path("usuarios", TemplateView.as_view(template_name = 'base.html')),


    path('loging/', Login.as_view(), name='login'),   
    path('logout/', Logout.as_view(), name='logout'), 
    path('test/', PermisoAA.as_view(), name = 'test'),
    path('formulario/', DatosFormulario.as_view(), name = 'datos_formulario'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('link/', EnvioDatos.as_view(), name='link_datos_trabajadores'),
    #rutas api
    path('usuarios/', include('core.usuarios.api.routers')),
    path('trabajadores/', include('core.trabajadores.api.routers')),
    path('permisos/', include('core.permisos.api.routers')),
    path('distributivo/', include('core.distributivo.api.routers')),
    path('acciones/', include('core.accionesPersonal.api.routers')),
    path('vacaciones/', include('core.vacaciones.api.routers')),
    path('asistencias/', include('core.asistencias.api.routers')),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)