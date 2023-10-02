import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


#SQLITE = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    }
#}

POSTGRESQL = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'talentohumano_db',
            'USER': 'talentohumano',
            'PASSWORD': 'talentohumano', 
            'HOST': '10.100.100.146',
            'PORT': '5432',
        }
}