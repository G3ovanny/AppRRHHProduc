import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { menuSlice, modalSlice } from './ui'
import { archivoSlice, datosPersonalesSlice, trabajadorSlice } from './trabajadores'
import { regimenSlice, nivelOcupacionalSlice, modalidadLaboralSlice, unidadOrganicaSlice, denominacionPuestoSlice, estructuraProgramaticaSlice, procesoSlice } from './distributivo'
import { motivoPermisoSlice } from './permisos/motivoPermisoSlice'
import { permisoSlice } from './permisos'
import { accionPersonalSlice, archivoAccionesSlice } from './accionPersonal'
import { cronogramaVacacionesSlice } from './vacaciones'
import { asistenciasSlice } from './asistencias'
import { usuariosSlice } from './usuarios'
import { cedulaSlice } from './auth/cedulaSlice'
import { grupoSlice } from './grupos'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cedula: cedulaSlice.reducer,
        menu: menuSlice.reducer,
        modal: modalSlice.reducer,
        trabajador: trabajadorSlice.reducer,
        datosTrabajadores: datosPersonalesSlice.reducer,
        archivo: archivoSlice.reducer,
        regimen: regimenSlice.reducer,
        nivelOcupacional: nivelOcupacionalSlice.reducer,
        modalidadLaboral: modalidadLaboralSlice.reducer,
        unidadOrganica: unidadOrganicaSlice.reducer,
        denominacionPuesto: denominacionPuestoSlice.reducer,
        estructura: estructuraProgramaticaSlice.reducer,
        proceso: procesoSlice.reducer,
        motivoPermiso: motivoPermisoSlice.reducer,
        permiso: permisoSlice.reducer,
        accionPersonal: accionPersonalSlice.reducer,
        archivoAcc: archivoAccionesSlice.reducer,
        cronograma: cronogramaVacacionesSlice.reducer,
        asistencia: asistenciasSlice.reducer,
        usuarios: usuariosSlice.reducer,
        grupos: grupoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
