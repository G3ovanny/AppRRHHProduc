import { Navigate, Route, Router, Routes, Link, Outlet } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'
import { AccionesPersonal, Cronograma, Dashboard, Usuarios } from '../views'
import { ThBase } from '../views/base'
import { Trabajadores } from '../views/trabajadores/pages/Trabajadores'
import { MotivoPermisos, Permisos } from '../views/permisos/pages'
import { Parametros } from '../views/distributivo'
import { Navbar } from '../layout'
import { Box, Toolbar } from '@mui/material'
import { Asistencias } from '../views/asistencias'


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <>
            {
                (status === 'not-authenticated')
                    ? (
                        <Routes>
                            <Route path='/' element={<LoginPage />} />
                            <Route path='/*' element={<Navigate to="/" />} />
                        </Routes>
                    )
                    : (
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            {/*<Menus />*/}
                            {<Navbar />}
                            <Box
                                className='animate__animated animate__zoomIn'
                                component="main"
                                sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
                            >
                                <Toolbar />
                                <Outlet />
                                <Routes>
                                    {/* DASHBOARD */}
                                    < Route path='/*' element={<Navigate to="/dashboard" />} />
                                    <Route path='/dashboard' element={<Dashboard />} />
                                    {/* NOMINA */}
                                    <Route path='/distributivo' element={<Parametros />} />
                                    <Route path='/servidores' element={<Trabajadores />} />
                                    {/* PERMISOS */}
                                    <Route path='/permisos' element={<Permisos />} />
                                    <Route path='/motivo' element={<MotivoPermisos />} />
                                    {/* ACCIONES DEL PERSONAL */}
                                    <Route path='/acciones-personal' element={<AccionesPersonal />} />
                                    {/* VACACIONES */}
                                    <Route path='/cronograma' element={<Cronograma />} />
                                    {/* ASISTENCIAS*/}
                                    <Route path='/asistencia' element={<Asistencias />} />
                                    {/* USUARIOS */}
                                    <Route path='/usuarios' element = {<Usuarios />} />
                                </Routes>
                            </Box>
                        </Box>

                    )
            }
        </>
    )
}
