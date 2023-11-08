
from django.conf import settings
from sqlalchemy import create_engine

db_config = settings.DATABASES['default']
db_url = f"postgresql+psycopg2://{db_config['USER']}:{db_config['PASSWORD']}@{db_config['HOST']}:{db_config['PORT']}/{db_config['NAME']}"


def cargar_datos(documento):

    engine = create_engine(db_url)    
    nuevoDocumento = documento[[
        'id_trabajador_id',
        'fecha_registro',
        'estado',
        'edificio',
        'hora',
        'state',
    ]]
    nuevoDocumento.to_sql('Asistencia', engine, if_exists='append', index=False)