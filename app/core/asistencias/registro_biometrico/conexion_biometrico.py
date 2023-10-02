from .obtener_asistencias import get_attendance_biometrico
from .obtener_asistencias import *
from zk import ZK

def get_connection_admin():
    # conexión biometrico administrativo#
    nombre_biometrico = "EDIFICIO_ADMINISTRATIVO"
    ip_address = "10.100.100.230"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, conn_status, zk)

def get_connection_aulas1():
    # Conexión al biometrico del edificio aulas 1
    nombre_biometrico = "EDIFICIO_AULAS1"
    ip_address = "172.20.4.151"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas2():
    nombre_biometrico = "EDIFICIO_AULAS2"
    ip_address = "172.20.4.152"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas3():
    nombre_biometrico = "EDIFICIO_AULAS3"
    ip_address = "172.20.4.153"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)


def get_connection_aulas4():
    nombre_biometrico = "EDIFICIO_AULAS4"
    ip_address = "172.20.4.154"
    port = 4370
    # timeout = 5
    zk = ZK(ip_address, port)
    # timeout
    conn_status = zk.connect()
    get_attendance_biometrico(nombre_biometrico, zk, conn_status)