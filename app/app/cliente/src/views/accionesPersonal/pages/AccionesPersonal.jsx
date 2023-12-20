import { NoteAdd, DriveFolderUpload } from '@mui/icons-material'
import { Alert, Box, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { AccionesPersonalModal, Table } from '../components'
import { useAccionPersonalStore, useArchivoAccStore, useModalStore } from '../../../hooks'

export const AccionesPersonal = () => {
    const { startSavingArchivoAcc, mensajeArchivoAcc } = useArchivoAccStore();
    const { mensajeAccion, setActiveAccion } = useAccionPersonalStore();
    const { openModal, nameModal } = useModalStore()
    const [age, setAge] = React.useState('');

    const onFileInputChange = async ({ target }) => {
        if (target.files === 0) return;
        const file = target.files[0]
        startSavingArchivoAcc(file)
    }
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleAddAccion = () => {
        setActiveAccion([])
        openModal('Nueva Acción')
    }

    let mensaje
    if (mensajeAccion) {
        mensaje = mensajeAccion
    }else {
        mensaje = mensajeArchivoAcc
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
                    sx={{ flex: '1 1 100%' }}
                    variant='h6'
                    id='tittle'
                    component='div'
                >
                    Acciones de personal
                </Typography>
                {/* <Tooltip title='Cargar' color='secondary'>
                    <IconButton >
                        <label htmlFor="btnFile" >
                            <DriveFolderUpload />
                        </label>
                    </IconButton>
                </Tooltip>
                <input
                    id="btnFile"
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                /> */}
                <Tooltip title='Agregar' color='secondary'>
                    <IconButton
                        onClick={handleAddAccion}
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
                    display={!!mensaje ? '' : 'none'}
                >
                    <Alert severity='success' >{mensaje}</Alert>

                </Grid>
            </Toolbar>
            {/* Tabla */}
            <Table />
            {/* Modal */}
            <AccionesPersonalModal titleModal={nameModal} />
        </Box>
    )
}
