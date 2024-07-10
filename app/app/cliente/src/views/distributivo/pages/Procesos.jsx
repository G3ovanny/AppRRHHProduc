import React, { useEffect, useState } from 'react'
import { useAlertDialogStore, useForm, useProcesoStore } from '../../../hooks'
import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { FiltroGeneral } from '../components/filtros'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { AlertDialog } from '../../../ui'


const formData = {
    proceso: '',
}
export const Procesos = () => {
    const { listProceso, startDeletingProceso, setActiveProceso, startSavingProceso, startLoadingProceso, activeProceso, isLoadingProceso = [], mensajeProceso, mensajeError } = useProcesoStore()
    const [resultadoBusqueda, setResultadoBusqueda] = useState('')
    const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const content = '¿Está seguro que quiere eliminar el registro?'


    const handelBuscar = (valorBuscar) => {
        const resultadoFiltrado = listProceso.filter((proceso) => {
            return proceso.proceso.toLowerCase().includes(valorBuscar.toLowerCase())
        })
        setResultadoBusqueda(resultadoFiltrado)
    }
    let lista = null
    if (!resultadoBusqueda) {
        lista = listProceso
    } else {
        lista = resultadoBusqueda
    }

    const formValidations = {
        proceso: [
            (value) => !!value,
            'Error en el formulario'
        ],
    }
    const {
        proceso,
        onInputChange,
        isFormValid,
        onResetForm,
        formState,
        setFormState } = useForm(formData, formValidations);

    const handleDelete = (e, element) => {
        setActiveProceso(element)
        openAlertDialog(content)
        //startDeletingProceso(element)
    }

    const handleEdit = (e, element) => {
        setActiveProceso(element)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingProceso({ ...formState })
            onResetForm()
        }
    }
    const handleCancelar = () => {
        setActiveProceso(isLoadingProceso)
        onResetForm()
    }

    const handleConfirmation = () => {
        startDeletingProceso(activeProceso)
        closeAlertDialog();
        setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
    };

    let mensaje = null
    if (mensajeProceso) {
        mensaje = <Alert severity='success'>{mensajeProceso}</Alert>;
    } else if (mensajeError) {
        mensaje = <Alert severity='error'>{mensajeError}</Alert>;
    } else {
        mensaje  // No se muestra ningún mensaje si no hay ni éxito ni error
    }
    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    useEffect(() => {
        startLoadingProceso()
        if (activeProceso !== null) {
            setFormState(activeProceso)
        }
    }, [activeProceso])
    return (
        <Box>
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    items
                    sx={{ flex: '1 1 100%' }}
                    display={!!mensajeProceso || !!mensajeError ? '' : 'none'}
                >
                    {mensaje}
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
                                            Proceso
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ mb: 3 }} >
                                        <FiltroGeneral onBuscar={handelBuscar} />
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <List sx={{
                                        width: '100%',
                                        //maxWidth: 360,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 400,
                                        '& ul': { padding: 0 },
                                    }}
                                    >
                                        {lista.map((proceso) => {
                                            return (
                                                <ListItem key={proceso.proceso}>
                                                    <ListItemText
                                                        primary={proceso.proceso}
                                                    //secondary={secondary? 'Secondary text' : null}
                                                    />
                                                    <Tooltip title="Eliminar" color="error">
                                                        <IconButton
                                                            onClick={e => handleDelete(e, proceso)}
                                                        >
                                                            <DeleteOutline />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Editar" color='secondary'>
                                                        <IconButton
                                                            onClick={e => handleEdit(e, proceso)}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItem>
                                            )
                                        })}
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
                                            id='proceso'
                                            autoComplete='false'
                                            label='Proceso'
                                            type='text'
                                            placeholder='Ingrese el proceso'
                                            fullWidth
                                            name='proceso'
                                            value={proceso || ''}
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
            </Grid>
            <AlertDialog
                open={deleteConfirmation}
                onClose={() => setDeleteConfirmation(false)}
                onConfirm={handleConfirmation}
                title="Confirmar Eliminación"
                content={content}
            />
        </Box>
    )
}
