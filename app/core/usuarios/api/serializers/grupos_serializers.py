from django.contrib.auth.models import Group
from rest_framework import serializers

class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')