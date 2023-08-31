import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useEstructuraProgramaticaStore } from '../../../hooks'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { FiltroGeneral } from '../components/filtros'

const formData = {
    estructura_programatica: '',
}

export const EstructuraProgramatica = () => {
    const { listEstructura, startDeletingEstructura, setActiveEstructura, startSavingEstructura, startLoadingEstructura, activeEstructura, inicialEstructura = [], mensajeEstructura } = useEstructuraProgramaticaStore()

    const [resultadoBusqueda, setResultadoBusqueda] = useState('')

    const handelBuscar = (valorBuscar) => {
        const resultadoFiltrado = listEstructura.filter((estructura) => {
            return estructura.estructura_programatica.toLowerCase().includes(valorBuscar.toLowerCase())
        })
        setResultadoBusqueda(resultadoFiltrado)
    }

    let lista = null


    if (!resultadoBusqueda) {
        lista = listEstructura
    } else {
        lista = resultadoBusqueda
    }


    const formValidations = {
        estructura_programatica: [
            (value) => !!value,
            'El campo es obligatorio'
        ],
    }

    const {
        estructura_programatica,
        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState } = useForm(formData, formValidations);

    const handleDelete = (e, element) => {
        startDeletingEstructura(element)
    }

    const handleEdit = (e, element) => {
        setActiveEstructura(element)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingEstructura({ ...formState })
            onResetForm()
        }
    }

    const handleCancelar = () => {

        setActiveEstructura(inicialEstructura)
        onResetForm()
    }

    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    useEffect(() => {
        startLoadingEstructura()
        if (activeEstructura !== null) {
            setFormState(activeEstructura)
        }
    }, [activeEstructura])


    return (
        <Box>
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!mensajeEstructura ? '' : 'none'}
                >
                    <Alert severity='success' >{mensajeEstructura}</Alert>
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
                                            Estructura Programática
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
                                            lista.map((estructura) => {
                                                return (
                                                    <ListItem key={estructura.estructura_programatica} >
                                                        <ListItemText
                                                            primary={estructura.estructura_programatica}
                                                        //secondary={secondary ? 'Secondary text' : null}
                                                        />
                                                        <Tooltip title="Eliminar" color="error">
                                                            <IconButton
                                                                onClick={e => handleDelete(e, estructura)}
                                                            >
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar" color='secondary'>
                                                            <IconButton
                                                                onClick={e => handleEdit(e, estructura)}
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
                                            id='estructura_programatica'
                                            autoComplete='false'
                                            label='Estructura Programatica'
                                            type='text'
                                            placeholder='Ingrese la Estructura Programatica'
                                            fullWidth
                                            name='estructura_programatica'
                                            value={estructura_programatica || ''}
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
        </Box>
    )
}
