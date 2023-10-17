import { Alert, Box, Divider, Grid, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDatosTrabStore } from '../../../hooks'
import { TableSkeleton } from '../../../ui/components/tablas/table'
import { Table } from '../components/tablaDatos'

export const DatosPersonales = () => {

    const { startLoadingDatosTrab, datosTrab } = useDatosTrabStore()


    return (
        <Box>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: ' 1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    Datos personales servidores
                </Typography>
            </Toolbar>
            <Divider />
            <Toolbar>
            </Toolbar>
            < Table />

        </Box>
    )
}
