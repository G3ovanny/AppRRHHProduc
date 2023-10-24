from rest_framework import viewsets, status
from core.usuarios.api.serializers.grupos_serializers import UserGroupSerializer
from django.contrib.auth.models import Group
from rest_framework.response import Response




class GruposViewSet(viewsets.ModelViewSet):
    serializer_class = UserGroupSerializer
    queryset = Group.objects.all()

    def list(self, request, *args, **kwargs):
        grupos = Group.objects.all()
        grupo_serializer = UserGroupSerializer(grupos, many = True)
        return Response(grupo_serializer.data, status=status.HTTP_200_OK)