import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useAlertDialogStore, useGradoStore } from '../../../hooks'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { FiltroGeneral } from '../components/filtros'
import { AlertDialog } from '../../../ui'

const formData = {
    grado: '',
}

export const Grado = () => {
    const { listGrado, startDeletingGrado, setActiveGrado, startSavingGrado, startLoadingGrado, activeGrado, inicialGrado = [], mensajeGrado } = useGradoStore()
    const [resultadoBusqueda, setResultadoBusqueda] = useState('')

    const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const content = '¿Está seguro que quiere eliminar el registro?'

    const handelBuscar = (valorBuscar) => {
        const resultadoFiltrado = listGrado.filter((grado) => {
            return grado.grado.toLowerCase().includes(valorBuscar.toLowerCase())
        })
        setResultadoBusqueda(resultadoFiltrado)
    }

    let lista = null


    if (!resultadoBusqueda) {
        lista = listGrado
    } else {
        lista = resultadoBusqueda
    }


    const formValidations = {
        grado: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
    }

    const {
        grado,
        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState } = useForm(formData, formValidations);

    const handleDelete = (e, element) => {
        setActiveGrado(element)
        openAlertDialog(content)
        //startDeletingGrado(element)
    }

    const handleEdit = (e, element) => {
        setActiveGrado(element)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingGrado({ ...formState })
            onResetForm()
        }
    }

    const handleCancelar = () => {

        setActiveGrado(inicialGrado)
        onResetForm()
    }
    const handleConfirmation = () => {
        startDeletingGrado(activeGrado)
        closeAlertDialog();
        setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
    };
    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    useEffect(() => {
        startLoadingGrado()
        if (activeGrado !== null) {
            setFormState(activeGrado)
        }
    }, [activeGrado])


    return (
        <Box>
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensajeGrado ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajeGrado}</Alert>
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
                                            Grado
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
                                    >
                                        {
                                            lista.map((grado) => {
                                                return (
                                                    <ListItem key={grado.grado} >
                                                        <ListItemText
                                                            primary={grado.grado}
                                                        //secondary={secondary ? 'Secondary text' : null}
                                                        />
                                                        <Tooltip title="Eliminar" color="error">
                                                            <IconButton
                                                                onClick={e => handleDelete(e, grado)}
                                                            >
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar" color='secondary'>
                                                            <IconButton
                                                                onClick={e => handleEdit(e, grado)}
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
                                            id='grado'
                                            autoComplete='false'
                                            label='Grado'
                                            type='text'
                                            placeholder='Ingrese el grado'
                                            fullWidth
                                            name='grado'
                                            value={grado || ''}
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
