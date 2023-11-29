from django.urls import path
from rest_framework.routers import DefaultRouter
from core.trabajadores.api.views.trabajadores_views import TrabajadorViewSet
from core.trabajadores.api.views.datosPersonales_views import DatosTrabajadoresViewSet
from core.trabajadores.envioCorreo.envio_correo_datos import EnvioDatos
from core.trabajadores.api.views.archivo_views import CorreosTrabajadoresViewSet
from core.trabajadores.api.views.archivo_views import VacacionesTrabajadoresViewSet
from ..api.views.archivo_views import ArchTrabajadoresViewSet

router = DefaultRouter()

router.register(r'trabajador', TrabajadorViewSet, basename='trabajador'),
router.register(r'archivo', ArchTrabajadoresViewSet, basename='archivo trabajadores'),
router.register(r'correos', CorreosTrabajadoresViewSet, basename='correos trabajadores'),
router.register(r'vacaciones', VacacionesTrabajadoresViewSet, basename='archivo trabajadores'),


#path('datos_trabajador', DatosTrabajadoresViewSet.as_view(), name='datos'),
#path('link/', EnvioDatos.as_view(), name='link'),
router.register(r'datos_trabajador', DatosTrabajadoresViewSet, basename= 'Datos personales del trabajador'),
#router.register(r'link', EnvioDatos.as_view(), name='link'),
urlpatterns = router.urls