from django.urls import path
from rest_framework.routers import DefaultRouter
from .views.cronograma_views import CronogramaVacacionesViewSet


router = DefaultRouter()

router.register(r'cronograma', CronogramaVacacionesViewSet,
                basename='cronograma'),

urlpatterns = router.urls
