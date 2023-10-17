import React from 'react'
import { Table } from '../components'
import { Alert, Box, Divider, Grid, Toolbar, Typography } from '@mui/material'
export const Asistencias = () => {
    const mensaje = ''
    const title = 'Lista de asistencia'
    return (
        // <TabPanel />
        <Box>
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant='h6'
                id='tittle'
                component='div'
            >
                Acciones de personal
            </Typography>
        </Toolbar>
        <Divider />
        <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensaje ? '' : 'none'}
                >
                    <Alert severity='success' >{mensaje}</Alert>

                </Grid>
            </Toolbar>

        {/* Tabla */}
        <Table title={title} />
        {/* Modal */}
    </Box>
    )
}
