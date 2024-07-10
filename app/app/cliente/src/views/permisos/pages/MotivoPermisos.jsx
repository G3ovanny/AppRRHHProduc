import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useAlertDialogStore, useForm, useMotivoPermisoStore } from '../../../hooks';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { FiltroGeneral } from '../../distributivo/components/filtros';
import { AlertDialog } from '../../../ui';

const formData = {
    motivo: '',
}

export const MotivoPermisos = () => {
    const { listMotivo, startDeletingMotivo, setActiveMotivo, startSavingMotivo, startLoadingMotivo, activeMotivo, inicialMotivo = [], mensajeMotivo } = useMotivoPermisoStore();
    const [resultadoBusqueda, setResultadoBusqueda] = useState('')
    const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const content = '¿Está seguro que quiere eliminar el registro?'
    const handelBuscar = (valorBuscar) => {
        const resultadoFiltrado = listMotivo.filter((motivo) => {
            return motivo.motivo.toLowerCase().includes(valorBuscar.toLowerCase())
        })
        setResultadoBusqueda(resultadoFiltrado)
    }

    let lista = null


    if (!resultadoBusqueda) {
        lista = listMotivo
    } else {
        lista = resultadoBusqueda
    }

    const formValidations = {
        motivo: [
            (value) => !!value,
            'Error en el formulario'
        ]
    }

    const {
        motivo,
        onInputChange,
        isFormValid,
        onResetForm,
        formState,
        setFormState } = useForm(formData, formValidations);

    const handleDelete = (e, element) => {
        setActiveMotivo(element)
        openAlertDialog(content)
        //startDeletingMotivo(element)
    }

    const handleEdit = (e, element) => {
        setActiveMotivo(element)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingMotivo({ ...formState })
            onResetForm()
        }
    }

    const handleCancelar = () => {
        setActiveMotivo(inicialMotivo)
        onResetForm()
    }

    const handleConfirmation = () => {
        startDeletingMotivo(activeMotivo)
        closeAlertDialog();
        setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
    };

    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    useEffect(() => {
        startLoadingMotivo()
        if (activeMotivo !== null) {
            setFormState(activeMotivo)
        }
    }, [activeMotivo])
    return (
        <Box >
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
                    Motivos de permiso
                </Typography>
            </Toolbar>
            <Divider />
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensajeMotivo ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajeMotivo}</Alert>
                </Grid>
            </Toolbar>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                <Grid item xs={12} sm={12} md={6}>
                    <Card>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                                        <Typography>
                                            Motivos de permiso
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ mb: 3 }} >
                                        <FiltroGeneral onBuscar={handelBuscar} />
                                    </Grid>
                                </Grid>
                                <Divider />

                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            //maxWidth: 360,
                                            bgcolor: 'background.paper',
                                            position: 'relative',
                                            overflow: 'auto',
                                            maxHeight: 400,
                                            '& ul': { padding: 0 },
                                        }}
                                    //dense={dense}
                                    >
                                        {
                                            lista.map((motivo) => {
                                                return (
                                                    <ListItem key={motivo.motivo}>
                                                        <ListItemText
                                                            primary={motivo.motivo}
                                                        //secondary={secondary ? 'Secondary text' : null}
                                                        />
                                                        <Tooltip title="Eliminar" color="error">
                                                            <IconButton
                                                                onClick={e => handleDelete(e, motivo)}
                                                            >
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar" color='secondary'>
                                                            <IconButton
                                                                onClick={e => handleEdit(e, motivo)}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Card>
                        <form onSubmit={onSubmit}>
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <CardContent>
                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                        <TextField sx={{ minWidth: 180 }} size="small"
                                            id='motivo'
                                            autoComplete='false'
                                            label='Motivo de permiso'
                                            type='text'
                                            placeholder='Ingrese el motivo de permiso'
                                            fullWidth
                                            name='motivo'
                                            value={motivo || ''}
                                            onChange={onInputChange}
                                        />

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        disabled={!isFormValid}
                                        onClick={onSubmit}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={handleCancelar}
                                    >
                                        Cancelar
                                    </Button>
                                </CardActions>
                            </Grid>
                        </form>

                    </Card>
                </Grid>
            </Grid >
            <AlertDialog
                open={deleteConfirmation}
                onClose={() => setDeleteConfirmation(false)}
                onConfirm={handleConfirmation}
                title="Confirmar Eliminación"
                content={content}
            />
        </Box >
    )
}
