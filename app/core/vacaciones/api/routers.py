from django.urls import path
from rest_framework.routers import DefaultRouter
from core.vacaciones.api.views.archivoCronograma_views import ArchCronogramaVacacionesViewSet
from .views.cronograma_views import CronogramaVacacionesViewSet


router = DefaultRouter()

router.register(r'cronograma', CronogramaVacacionesViewSet, basename='cronograma'),
router.register(r'archivo', ArchCronogramaVacacionesViewSet, basename='archivo cronograma de vacaciones')
urlpatterns = router.urls
