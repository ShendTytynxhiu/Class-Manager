from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from . import managers


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username        =   models.CharField(_('username'), max_length=255, unique=True, null=False)
    email           =   models.EmailField(_('email address'), unique=True, null=False)

    first_name      =   models.CharField(_("first name"), max_length=100)
    last_name       =   models.CharField(_("last name"), max_length=100)

    is_staff        =   models.BooleanField(default=False)
    is_active       =   models.BooleanField(default=True)
    is_teacher      =   models.BooleanField(default=False)
    
    date_joined     =   models.DateField(default=timezone.now)

    USERNAME_FIELD  =   'email'
    REQUIRED_FIELDS =   [username, first_name, last_name]

    objects         =   managers.CustomUserManager()

    def __str__(self):
        return self.email




