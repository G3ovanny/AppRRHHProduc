import { permisos } from './permisos'
import { nomina } from './nomina'
import { accionesPersonal } from './accionesPersonal'
import { vacaciones } from './vacaciones'
import { dashboard } from './dashboard'
import { asistencias } from './asistencias'
import { usuarios } from './usuarios'

export const menuItems = {
    items: [
        dashboard, 
        nomina, 
        permisos, 
        vacaciones, 
        accionesPersonal, 
        //asistencias, 
        usuarios,
    ]
}