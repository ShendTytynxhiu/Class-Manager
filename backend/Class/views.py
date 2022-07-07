from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
from django.shortcuts import get_object_or_404
from django.db.models.functions import Now

from rest_framework.response import Response
from rest_framework import status

from django_filters.rest_framework import DjangoFilterBackend

from django.contrib.auth import get_user_model
from .models import Class, Chat, Test, WorkSheet, Grade
from .serializers import ClassSerializer, ChatSerializer, TestSerializer, WorkSheetSerializer, GradeSerializer
from .filters import ClassFilterStudentSet, ClassFilterTeacherSet, ChatFilterSet, TestFilterSet, WorkSheetFilterSet, GradeFilterSet

User = get_user_model()


class ClassView(generics.ListCreateAPIView):
    queryset            =   Class.objects.all()
    serializer_class    =   ClassSerializer


class ClassFilter(APIView):
    queryset            =   Class.objects.all()
    serializer_class    =   ClassSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   ClassFilterStudentSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)

        return queryset
    
    def get(self, request, format=None):
        classes     =   self.filter_queryset(self.queryset)
        serializer  =   self.serializer_class(classes, many=True)

        res = []

        for i in serializer.data:
            teacher_name = User.objects.get(id=i["teacher"]).username
            sub_set = {"teacher_name": teacher_name}
            sub_set.update(i)
            res.append(sub_set)

        return Response(res, status=status.HTTP_200_OK)


class ClassTeacherFilter(APIView):
    queryset            =   Class.objects.all()
    serializer_class    =   ClassSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   ClassFilterTeacherSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)

        return queryset
    
    def get(self, request, format=None):
        classes     =   self.filter_queryset(self.queryset)
        serializer  =   self.serializer_class(classes, many=True)

        res = []

        for i in serializer.data:
            teacher_name = User.objects.get(id=i["teacher"]).username
            sub_set = {"teacher_name": teacher_name}
            sub_set.update(i)
            res.append(sub_set)

        return Response(res, status=status.HTTP_200_OK)


class ClassStudentTeacherFilter(APIView):
    queryset            =   Class.objects.all()
    serializer_class    =   ClassSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   ClassFilterTeacherSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)

        return queryset
    
    def get(self, request, format=None):
        classes     =   self.filter_queryset(self.queryset)
        serializer  =   self.serializer_class(classes, many=True)

        res = []
        student_names = []

        for i in serializer.data:
            for j in i["students"]:
                student_names.append(User.objects.get(id=j).username)

            sub_set = {"student_names": student_names}
            sub_set.update(i)

            res.append(sub_set)

        return Response(res, status=status.HTTP_200_OK)


class ClassDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset            =   Class.objects.all()
    serializer_class    =   ClassSerializer


class ChatView(generics.ListCreateAPIView):
    queryset            =   Chat.objects.all()
    serializer_class    =   ChatSerializer


class ChatFilter(generics.ListAPIView):
    queryset            =   Chat.objects.all()
    serializer_class    =   ChatSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   ChatFilterSet


class ChatDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset            =   Chat.objects.all()
    serializer_class    =   ChatSerializer


def get_last_10_messages(chatId):
    chat = Chat.objects.filter(room_id=chatId).order_by('timestamp')[:10]

    return chat
    

def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)


class TestView(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser]
    queryset            =   Test.objects.all()
    serializer_class    =   TestSerializer


class StudentTestFilter(APIView):
    queryset            =   Test.objects.filter(due_date__gt=Now())
    serializer_class    =   TestSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   TestFilterSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
            
        return queryset
    
    def get(self, request, format=None):
        tests       =       self.filter_queryset(self.queryset)
        serializer  =       self.serializer_class(tests, many=True)

        return Response(serializer.data)


class TeacherTestFilter(APIView):
    queryset            =   Test.objects.all()
    serializer_class    =   TestSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   TestFilterSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
            
        return queryset
    
    def get(self, request, format=None):
        tests       =       self.filter_queryset(self.queryset)
        serializer  =       self.serializer_class(tests, many=True)

        return Response(serializer.data)


class WorkSheetView(generics.ListCreateAPIView):
    parser_classes      =   [MultiPartParser]
    queryset            =   WorkSheet.objects.all()
    serializer_class    =   WorkSheetSerializer


class WorkSheetFilter(APIView):
    parser_classes      =   [MultiPartParser]

    queryset            =   WorkSheet.objects.all()
    serializer_class    =   WorkSheetSerializer

    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   WorkSheetFilterSet

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset    =   backend().filter_queryset(self.request, queryset, self)
            
        return queryset
    
    def get(self, request, format=None):
        worksheets      =   self.filter_queryset(self.queryset)
        serializer      =   self.serializer_class(worksheets, many=True)

        res = []

        for i in serializer.data:
            student_name    =   User.objects.get(id=i["student"]).username
            try:
                grade       =   Grade.objects.get(worksheet=i["id"]).points
            except:
                grade       =   0

            subset          =   {"student_name": student_name, "grade": grade}
            subset.update(i)

            res.append(subset)

        return Response(res, status=status.HTTP_200_OK)


class GradeView(generics.ListCreateAPIView):
    parser_classes      =   [MultiPartParser]

    queryset            =   Grade.objects.all()
    serializer_class    =   GradeSerializer


class GradeFilter(generics.ListAPIView):
    queryset            =   Grade.objects.all()
    serializer_class    =   GradeSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   GradeFilterSet