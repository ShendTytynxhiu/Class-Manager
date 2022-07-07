from django_filters.rest_framework import FilterSet

from django.contrib.auth import get_user_model

User = get_user_model()


class UserFilterSet(FilterSet):
    class Meta:
        model   =   User
        fields  =   ["classes_set"]
# http://127.0.0.1:8000/user-filter?classes_set=5

