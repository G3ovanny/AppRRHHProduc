from rest_framework.routers import DefaultRouter
from .views.asistencia_view import AsistenciaViewSet


router = DefaultRouter()

router.register(r'asistencia', AsistenciaViewSet, basename='asistencia'),

urlpatterns = router.urls