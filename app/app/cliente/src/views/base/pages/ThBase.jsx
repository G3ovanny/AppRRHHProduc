import React from 'react'
import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../../layout'
//import { Menus } from '../../../layout/components'


export const ThBase = () => {
    return (
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
            </Box>
        </Box>
    )
}
