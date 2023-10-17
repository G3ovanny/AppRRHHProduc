
import os

from datetime import timedelta
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.

from app.config.db import POSTGRESQL
# SQLITE
# POSTGRESQL

BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-p)@3(-o3_qi@cr_fir4w8w-p#2$s_olh&e2i++))xf5tmz6+-y'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['10.100.100.146']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # aplicaciones terceras
    'corsheaders',
    'rest_framework',
    # 'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'simple_history',
    # aplicaciones locales
    'core.base',
    'core.distributivo',
    'core.usuarios',
    'core.trabajadores',
    'core.permisos',
    'core.accionesPersonal',
    'core.vacaciones',
    'core.asistencias',
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'app.config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ os.path.join(BASE_DIR, 'cliente/src/dist')
            ],
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


WSGI_APPLICATION = 'app.config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = POSTGRESQL
# SQLITE


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'es'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'usuarios.Usuario'

TIME_INPUT_FORMATS = [
    '%H:%M',        # '14:30'
    '%I:%M:%S %p',  # 6:22:44 PM
    '%I:%M %p',  # 6:22 PM
    '%I %p',  # 6 PM
    '%H:%M:%S',     # '14:30:59'
    '%H:%M:%S.%f',  # '14:30:59.000200'
]

# DATETIME_INPUT_FORMATS = [
#    '%m/%d/%Y %H:%M',       # '10/25/2006 14:30'
#    '%Y-%m-%d %H:%M:%S',    # '2006-10-25 14:30:59'
#    '%Y-%m-%d %H:%M',       # '2006-10-25 14:30'
#    '%Y-%m-%d',             # '2006-10-25'
#    '%m/%d/%Y %H:%M:%S',    # '10/25/2006 14:30:59'
#    '%m/%d/%Y',             # '10/25/2006'
#    '%m/%d/%y %H:%M:%S',    # '10/25/06 14:30:59'
#    '%m/%d/%y %H:%M',       # '10/25/06 14:30'
#    '%m/%d/%y']

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True
}
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

##################
# Needed for 'debug' to be available inside templates.
# https://docs.djangoproject.com/en/3.2/ref/templates/api/#django-template-context-processors-debug
# INTERNAL_IPS = ['127.0.0.1']

# # Vite App Dir: point it to the folder your vite app is in.
VITE_APP_DIR = BASE_DIR / "cliente/src"

# # Static files (CSS, JavaScript, Images)
# # https://docs.djangoproject.com/en/3.1/howto/static-files/

# # You may change these, but it's important that the dist folder is includedself.
# # If it's not, collectstatic won't copy your bundle to production.

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    VITE_APP_DIR / "dist",
]
STATIC_ROOT = BASE_DIR / "staticfiles"

###################
# STATIC_URL = '/static/'

# STATICFILES_DIRS = [ 
#      os.path.join(BASE_DIR, 'cliente/src/dist'),
# ]
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ORIGIN_ALLOW_ALL = True


# CORRIGE EL ERROR DE CORS
CORS_ORIGIN_WHITELIST = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


# EMAIL
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'jeffersonlara98@gmail.com'
EMAIL_HOST_PASSWORD = 'wthenawzwfgkmqnu'
EMAIL_USE_TLS = True
