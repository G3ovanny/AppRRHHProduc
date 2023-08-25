from rest_framework.routers import DefaultRouter
from core.usuarios.api.views.usuarios_views import UsuarioViewSet

router = DefaultRouter()

router.register(r'usuario', UsuarioViewSet, basename='usuario')

urlpatterns = router.urls