
from rest_framework.routers import DefaultRouter
from core.distributivo.api.views.escalaOcupacional_view import EscalaOcupacionalViewSet
from ..api.views.grado_view import GradoViewSet
from ..api.views.proceso_view import ProcesoViewSet
from ..api.views.regimen_view import RegimenViewSet
from ..api.views.nivelOcupacional_view import NivelOcupacionalViewSet
from ..api.views.modalidadLaboral_view import ModalidadLaboralViewSet
from ..api.views.unidadOrganica_view import UnidadOrganicaViewSet
from ..api.views.denominacionPuesto_view import DenominacionPuestoViewSet
from .views.estructuraProgramatica_view import EstructuraViewSet
router = DefaultRouter()

router.register(r'regimen', RegimenViewSet, basename='regimen'),
router.register(r'nivel', NivelOcupacionalViewSet, basename='nivel ocupacional'),
router.register(r'modalidad', ModalidadLaboralViewSet,basename='modalidad laboral'),
router.register(r'unidad', UnidadOrganicaViewSet, basename='unidad organica'),
router.register(r'denominacion', DenominacionPuestoViewSet, basename='denominacion del puesto'),
router.register(r'estructura', EstructuraViewSet, basename='estructura programatica'),
router.register(r'proceso', ProcesoViewSet, basename='proceso'),
router.register(r'grado', GradoViewSet, basename='grado'),
router.register(r'escala', EscalaOcupacionalViewSet, basename='escala ocupacional'),
urlpatterns = router.urls
