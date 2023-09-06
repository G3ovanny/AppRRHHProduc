from django.urls import path
from rest_framework.routers import DefaultRouter
from core.trabajadores.api.views.trabajadores_views import TrabajadorViewSet
from core.trabajadores.api.views.datosPersonales_views import DatosTrabajadoresViewSet
from ..api.views.archivo_views import ArchTrabajadoresViewSet

router = DefaultRouter()

router.register(r'trabajador', TrabajadorViewSet, basename='trabajador'),
router.register(r'archivo', ArchTrabajadoresViewSet, basename='archivo trabajadores'),
router.register(r'datos_trabajador', DatosTrabajadoresViewSet, basename= 'Datos personales del trabajador')

urlpatterns = router.urls