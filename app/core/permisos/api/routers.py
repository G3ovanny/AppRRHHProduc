from django.urls import path 
from rest_framework.routers import DefaultRouter

from core.permisos.api.views.permisos_trabajador_views import PermisosTrabajadorViewSet
from ..api.views.motivo_views import MotivoPermisoViewSet
from ..api.views.permiso_views import PermisoViewSet

router = DefaultRouter()

router.register(r'motivo', MotivoPermisoViewSet, basename='motivo')
router.register(r'permiso', PermisoViewSet, basename='permiso')
router.register(r'permisos', PermisosTrabajadorViewSet, basename='permisos por trabajador')


urlpatterns = router.urls