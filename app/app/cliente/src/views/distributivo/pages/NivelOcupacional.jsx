import { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { useForm } from '../../../hooks';
import { useNivelOcuStore } from '../../../hooks/distributivo';
import { FiltroGeneral } from '../components/filtros';

const formData = {
  cod_nivel_ocupacional: '',
  nivel_ocupacional: ''
}

export const NivelOcupacional = () => {
  const { startDeletingNivel, setActiveNivel, startSavingNivel, startLoadingNivel, listNivel, activeNivel, inicialNivel = [], mensajeNivel } = useNivelOcuStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listNivel.filter((nivel) => {
      return nivel.nivel_ocupacional.toLowerCase().includes(valorBuscar.toLowerCase()) || nivel.cod_nivel_ocupacional.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null


  if (!resultadoBusqueda) {
    lista = listNivel
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_nivel_ocupacional: [
      (value) => !!value,
      'Error en el formulario'
    ],
    nivel_ocupacional: [
      (value) => !!value,
      'Error en el formulario'
    ],
  }

  const {
    cod_nivel_ocupacional,
    nivel_ocupacional,
    onInputChange,
    isFormValid,
    onResetForm,
    formState,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    startDeletingNivel(element)
  }

  const handleEdit = (e, element) => {
    setActiveNivel(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingNivel({ ...formState })
      onResetForm()
    }
  }

  const handleCancelar = () => {
    setActiveNivel(inicialNivel)
    onResetForm()
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  useEffect(() => {
    startLoadingNivel()
    if (activeNivel !== null) {
      setFormState(activeNivel)
    }
  }, [activeNivel])

  return (
    <Box >
        <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeNivel ? '' : 'none'}
        >
          <Alert severity='success' >{mensajeNivel}</Alert>
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
                      Nivel Ocupacional
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
                      lista.map((nivel) => {
                        return (
                          <ListItem key={nivel.nivel_ocupacional}>
                            <ListItemText
                              primary={nivel.nivel_ocupacional}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, nivel)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, nivel)}
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
                      id='cod_nivel_ocupacional'
                      autoComplete='false'
                      label='Código del nivel ocupacional'
                      type='text'
                      placeholder='Ingrese el código del nivel ocupacional'
                      fullWidth
                      name='cod_nivel_ocupacional'
                      value={cod_nivel_ocupacional || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='nivel_ocupacional'
                      autoComplete='false'
                      label='Nivel ocupacional'
                      type='text'
                      placeholder='Ingrese el nivel ocupacional'
                      fullWidth
                      name='nivel_ocupacional'
                      value={nivel_ocupacional || ''}
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
    </Box >
  )
}
