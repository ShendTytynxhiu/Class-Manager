from django.urls import path
from . import views

urlpatterns = [
    path("class/", views.ClassView.as_view()),
    path("chat/", views.ChatView.as_view()),
    path("test/", views.TestView.as_view()),
    path("worksheet/", views.WorkSheetView.as_view()),
    path("grade/", views.GradeView.as_view()),

    path("classes-filter", views.ClassFilter.as_view()),
    path("classes-teacher-filter", views.ClassTeacherFilter.as_view()),
    path("classes-student-teacher-filter", views.ClassStudentTeacherFilter.as_view()),
    path("chat-filter", views.ChatFilter.as_view()),
    path("student-test-filter", views.StudentTestFilter.as_view()),
    path("teacher-test-filter", views.TeacherTestFilter.as_view()),
    path("worksheet-filter", views.WorkSheetFilter.as_view()),
    path("worksheet-student-filter", views.WorkSheetStudentFilter.as_view()),
    path("grade-filter", views.GradeFilter.as_view()),

    path("chat-detail/<int:pk>/", views.ChatDetail.as_view()),
    path("class-detail/<int:pk>/", views.ClassDetail.as_view()),
]