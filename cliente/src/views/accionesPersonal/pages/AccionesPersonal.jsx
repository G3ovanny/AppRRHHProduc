import { NoteAdd, DriveFolderUpload } from '@mui/icons-material'
import { Alert, Box, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { AccionesPersonalModal, Table } from '../components'
import { useArchivoAccStore, useModalStore } from '../../../hooks'

export const AccionesPersonal = () => {
    const { startSavingArchivoAcc, mensajeArchivoAcc } = useArchivoAccStore();
    const { openModal, nameModal } = useModalStore()
    const [age, setAge] = React.useState('');

    const onFileInputChange = async ({ target }) => {
        if (target.files === 0) return;
        const file = target.files[0]
        console.log(file)
        startSavingArchivoAcc(file)
    }
    const handleChange = (event) => {
        console.log(age)
        setAge(event.target.value);
    };
    const handleAddAccion = () => {
        openModal('Nueva Acción')
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
                <Tooltip title='Cargar' color='secondary'>
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
                />
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
                    display={!!mensajeArchivoAcc ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajeArchivoAcc}</Alert>

                </Grid>
            </Toolbar>
            {/* Tabla */}
            <Table />
            {/* Modal */}
            <AccionesPersonalModal titleModal={nameModal} />
        </Box>
    )
}
