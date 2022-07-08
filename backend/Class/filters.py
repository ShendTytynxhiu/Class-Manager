from django_filters.rest_framework import FilterSet

from .models import Class, Chat, Test, WorkSheet, Grade


class ClassFilterStudentSet(FilterSet):
    class Meta:
        model   =   Class
        fields  =   ["students"]
# http://127.0.0.1:8000/class-filter?students=2


class ClassFilterTeacherSet(FilterSet):
    class Meta:
        model   =   Class
        fields  =   ["teacher"]
# http://127.0.0.1:8000/class-filter?teacher=2


class ChatFilterSet(FilterSet):
    class Meta:
        model   =   Chat
        fields  =   ["user", "room"]
# http://127.0.0.1:8000/class-filter?students=2


class TestFilterSet(FilterSet):
    class Meta:
        model   =   Test
        fields  =   ["_class"]
# http://127.0.0.1:8000/test-filter?_class=2


class WorkSheetFilterSet(FilterSet):
    class Meta:
        model   =   WorkSheet
        fields  =   ["test"]
# http://127.0.0.1:8000/worksheet-filter?test=2


class WorkSheetStudentFilterSet(FilterSet):
    class Meta:
        model   =   WorkSheet
        fields  =   ["student"]


class GradeFilterSet(FilterSet):
    class Meta:
        model   =   Grade
        fields  =   ["worksheet"]
# http://127.0.0.1:8000/grade-filter?worksheet=2