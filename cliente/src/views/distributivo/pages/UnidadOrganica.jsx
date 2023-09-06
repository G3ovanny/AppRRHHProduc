import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { useForm } from '../../../hooks';
import { useUnidadOrganicaStore } from '../../../hooks/distributivo';
import { FiltroGeneral } from '../components/filtros';

const formData = {
  cod_unidad: '',
  unidad_organica: ''
}

export const UnidadOrganica = () => {

  const { listUnidad, startDeletingUnidad, setActiveUnidad, startSavingUnidad, startLoadingUnidad, activeUnidad, inicialUnidad = [], mensajeUnidad } = useUnidadOrganicaStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listUnidad.filter((unidad) => {
      return unidad.unidad_organica.toLowerCase().includes(valorBuscar.toLowerCase()) || unidad.cod_unidad.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null


  if (!resultadoBusqueda) {
    lista = listUnidad
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_unidad: [
      (value) => !!value,
      'Error en el formulario'
    ],
    unidad_organica: [
      (value) => !!value,
      'Error en el formulario'
    ],
  }
  const {
    cod_unidad,
    unidad_organica,
    onInputChange,
    isFormValid,
    onResetForm,
    formState,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    startDeletingUnidad(element)
  }

  const handleEdit = (e, element) => {
    setActiveUnidad(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingUnidad({ ...formState })
      onResetForm()
    }
  }

  const handleCancelar = () => {
    setActiveUnidad(inicialUnidad)
    onResetForm()
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  useEffect(() => {
    startLoadingUnidad()
    if (activeUnidad !== null) {
      setFormState(activeUnidad)
    }
  }, [activeUnidad])

  return (
    <Box>
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeUnidad ? '' : 'none'}
        >
          <Alert severity='success' >{mensajeUnidad}</Alert>
        </Grid>
      </Toolbar>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Card >
            <Grid item xs={12} sx={{ mt: 1 }}>
              <CardContent >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                    <Typography>
                      Unidad Orgánica
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
                      lista.map((unidad) => {
                        return (
                          <ListItem key={unidad.unidad_organica}>
                            <ListItemText
                              primary={unidad.unidad_organica}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, unidad)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, unidad)}
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
                      id='cod_unidad'
                      autoComplete='false'
                      label='Código de la unidad organica'
                      type='text'
                      placeholder='Ingrese el código de la unidad orgánica'
                      fullWidth
                      name='cod_unidad'
                      value={cod_unidad || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='unidad_organica'
                      autoComplete='false'
                      label='Unidad orgánica'
                      type='text'
                      placeholder='Ingrese la unidad organica'
                      fullWidth
                      name='unidad_organica'
                      value={unidad_organica || ''}
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
    </Box>
  )
}
