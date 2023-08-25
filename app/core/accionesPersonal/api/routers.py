from rest_framework.routers import DefaultRouter
from ..api.views.AccionPersonal_views import AccionPersonalViewSet
from ..api.views.archivo_views import ArchivoAccionesViewSet

router = DefaultRouter()

router.register(r'accion', AccionPersonalViewSet, basename='accion'),
router.register(r'archivo', ArchivoAccionesViewSet,
                basename='archivo acciones')

urlpatterns = router.urls
