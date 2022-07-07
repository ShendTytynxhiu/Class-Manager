from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   User
        fields  =   "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   User
        fields  =   ["email", "username", "password", "first_name", "last_name", "is_teacher"]
