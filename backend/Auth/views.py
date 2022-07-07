from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser

from rest_framework.response import Response
from rest_framework import status

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from django.contrib.auth import get_user_model
from .serializers import StaffSerializer, UserSerializer
from .filters import UserFilterSet

User = get_user_model()


class UserList(APIView):
    # queryset            =   User.objects.all()
    # serializer_class    =   UserSerializer
    parser_classes = [MultiPartParser]

    model_class         =   User
    serializer_class    =   UserSerializer

    def get(self, request, format=None):
        users = self.model_class.objects.all()
        serializer = self.serializer_class(users, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = User(
                username    =   request.data["username"],
                email       =   request.data["email"],
                first_name  =   request.data["first_name"],
                last_name   =   request.data["last_name"],
                is_teacher  =   request.data["is_teacher"]=="true",
                )
            user.set_password(request.data["password"])
            
            user.save()

            token, created = Token.objects.get_or_create(user=user)

            res = {"Token": token.key, "id": user.id, "is_teacher": user.is_teacher}
            res.update(serializer.data)

            return Response(res, status=status.HTTP_201_CREATED)


class UserSignUp(APIView):
    model_class         =   User
    serializer_class    =   UserSerializer

    def get(self, request, format=None):
        users = self.model_class.objects.all()
        serializer = self.serializer_class(users, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = User(
                username    =   request.data["username"],
                email       =   request.data["email"],
                first_name  =   request.data["first_name"],
                last_name   =   request.data["last_name"],
                )
            user.set_password(request.data["password"])
            
            user.save()

            token, created = Token.objects.get_or_create(user=user)

            res = {"Token": token.key, "id": user.id, "is_teacher": user.is_teacher}
            res.update(serializer.data)

            return Response(res, status=status.HTTP_201_CREATED)


class UserSignIn(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        print(user.is_teacher)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token'         :   token.key,
            'user_id'       :   user.pk,
            'user_email'    :   user.email,
            'user_username' :   user.username,
            "is_teacher"    :   user.is_teacher
        })


class UserFilter(generics.ListAPIView):
    queryset            =   User.objects.all()
    serializer_class    =   UserSerializer
    filter_backends     =   [DjangoFilterBackend]
    filterset_class     =   UserFilterSet


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset            =   User.objects.all()
    serializer_class    =   StaffSerializer