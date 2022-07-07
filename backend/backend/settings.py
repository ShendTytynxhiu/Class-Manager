import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'k.;qhGM<CrLR!P]La<h@WjT"HvBq#rf,bUpj&F7x5JK~bc;\BMk-Q},HM2G=c$XT8bxX%VNnk4^m%U<"vk*%5tfBekHb5r9q,;m'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django_filters',
    'channels',

    'Auth',
    'Class',
]

AUTH_USER_MODEL = 'Auth.CustomUser'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ],
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    'csp.middleware.CSPMiddleware'
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'class_manager',
        'USER': 'root',
        'PASSWORD': 'python101',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE       =   'en-us'
TIME_ZONE           =   'UTC'

USE_I18N            =   True
USE_TZ              =   True

STATIC_URL          =   'static/'
DEFAULT_AUTO_FIELD  =   'django.db.models.BigAutoField'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
#         },
#     },
# }

ASGI_APPLICATION = "backend.routing.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

CSRF_COOKIE_SECURE                  =      True
SESSION_COOKIE_SECURE               =      True
SECURE_HSTS_SECONDS                 =      0
SECURE_HSTS_INCLUDE_SUBDOMAINS      =      True
SECURE_HSTS_PRELOAD                 =      True
CSP_DEFAULT_SRC                     =      ("'self'",)
CSP_STYLE_SRC                       =      ("'self'",)
CSP_SCRIPT_SRC                      =      ("'self'",)
CSP_IMG_SRC                         =      ("'self'",)
CSP_FONT_SRC                        =      ("'self'",)

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]