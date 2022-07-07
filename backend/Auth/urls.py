from django.urls import path
from . import views

urlpatterns = [
    path("user/", views.UserList.as_view()),
    path("user-detail/<int:pk>", views.UserDetail.as_view()),

    path('sign-up/', views.UserSignUp.as_view()),
    path('sign-in/', views.UserSignIn.as_view()),

    path('user-filter', views.UserFilter.as_view()),
]