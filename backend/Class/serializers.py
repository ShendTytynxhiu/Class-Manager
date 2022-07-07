from rest_framework import serializers
from .models import Class, Chat, Test, WorkSheet, Grade


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   Class
        fields  =   "__all__"


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   Chat
        fields  =   "__all__"


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   Test
        fields  =   "__all__"


class WorkSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   WorkSheet
        fields  =   "__all__"


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model   =   Grade
        fields  =   "__all__"