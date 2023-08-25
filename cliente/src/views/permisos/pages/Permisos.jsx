import { NoteAdd } from '@mui/icons-material'
import { Alert, Box, Divider, Grid, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { PermisoModal, Table } from '../components'
import { useModalStore, usePermisoStore } from '../../../hooks'

export const Permisos = () => {
    const { openModal, nameModal } = useModalStore();
    const { mensajePermiso } = usePermisoStore();
    
    const handleAddPermiso = () => {
        openModal('Nuevo Permiso')
    }
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
                    Permisos
                </Typography>
                <Tooltip title="Agregar Permiso" color="secondary" >
                    <IconButton
                        onClick={handleAddPermiso}
                    >
                        <NoteAdd />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <Divider />
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensajePermiso ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajePermiso}</Alert>
                </Grid>
            </Toolbar>
            <Table />
            <PermisoModal titleModal={nameModal} />
        </Box>
    )
}
