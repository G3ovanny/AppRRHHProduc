from rest_framework.routers import DefaultRouter

from ..api.views.motivo_views import MotivoPermisoViewSet
from ..api.views.permiso_views import PermisoViewSet

router = DefaultRouter()

router.register(r'motivo', MotivoPermisoViewSet, basename='motivo')
router.register(r'permiso', PermisoViewSet, basename='permiso')

urlpatterns = router.urls