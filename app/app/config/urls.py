from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from core.usuarios.views import Login, Logout
from core.trabajadores.api.views.datosFormulario_views import DatosFormulario
from core.permisos.views import PermisoAA


urlpatterns = [
    path('admin/', admin.site.urls),
    path('loging/', Login.as_view(), name='login'),   
    path('logout/', Logout.as_view(), name='logout'), 
    path('test/', PermisoAA.as_view(), name = 'test'),
    path('formulario/', DatosFormulario.as_view(), name = 'datos_formulario'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #rutas api
    path('usuarios/', include('core.usuarios.api.routers')),
    path('trabajadores/', include('core.trabajadores.api.routers')),
    path('permisos/', include('core.permisos.api.routers')),
    path('distributivo/', include('core.distributivo.api.routers')),
    path('acciones/', include('core.accionesPersonal.api.routers')),
    path('vacaciones/', include('core.vacaciones.api.routers')),
    path('asistencias/', include('core.asistencias.api.routers')),
]
