import { permisos } from './permisos'
import { nomina } from './nomina'
import { accionesPersonal } from './accionesPersonal'
import { vacaciones } from './vacaciones'
import { dashboard } from './dashboard'
import { asistencias } from './asistencias'

export const menuItems = {
    items: [dashboard, nomina, asistencias, permisos, vacaciones, accionesPersonal]
}