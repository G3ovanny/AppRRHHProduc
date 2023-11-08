import { PersonAdd } from '@mui/icons-material'
import { Alert, Box, Divider, Grid, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Table } from '../components/tabla'
import { UsuarioModal } from '../components/modal'
import { useModalStore, useUsuarioStore } from '../../../hooks'

export const Usuarios = () => {
    const { openModal, nameModal } = useModalStore()
    const { mensajeUsuario }=useUsuarioStore();

    const handeleAddTrabajador = () => {
        openModal('Nuevo Usuario')
    }
    return (
        <Box>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}>
                <Typography
                    sx={{ flex: ' 1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    Usuarios del sistema
                </Typography>
                <Tooltip title="Agregar" color="secondary" >
                    <IconButton
                        onClick={handeleAddTrabajador}
                    >
                        <PersonAdd />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <Divider />
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensajeUsuario ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajeUsuario}</Alert>
                </Grid>
            </Toolbar>
            {/* Tabla */}
            <Table />
            { /* Modal */}
            <UsuarioModal titleModal={nameModal} />
        </Box>
    )
}
