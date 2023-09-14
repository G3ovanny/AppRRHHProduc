import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { useForm } from '../../../hooks';
import { useModalidadLaboralStore } from '../../../hooks/distributivo';
import { FiltroGeneral } from '../components/filtros';

const formData = {
  cod_modalidad: '',
  modalidad_laboral: ''
}

export const ModalidadLaboral = () => {

  const { listModalidad, startDeletingModalidad, setActiveModalidad, startSavingModalidad, startLoadingModalidad, activeModalidad, inicialModalidad = [], mensajeModalidad } = useModalidadLaboralStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listModalidad.filter((modalidad) => {
      return modalidad.modalidad_laboral.toLowerCase().includes(valorBuscar.toLowerCase()) || modalidad.cod_modalidad.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null


  if (!resultadoBusqueda) {
    lista = listModalidad
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_modalidad: [
      (value) => !!value,
      'Error en el formulario'
    ],
    modalidad_laboral: [
      (value) => !!value,
      'Error en el formulario'
    ],
  }

  const {
    cod_modalidad,
    modalidad_laboral,
    onInputChange,
    isFormValid,
    onResetForm,
    formState,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    startDeletingModalidad(element)
  }

  const handleEdit = (e, element) => {
    setActiveModalidad(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingModalidad({ ...formState })
      onResetForm()
    }
  }

  const handleCancelar = () => {
    setActiveModalidad(inicialModalidad)
    onResetForm()
  }
  useEffect(() => {
    setResultadoBusqueda()
  }, [])
  useEffect(() => {
    startLoadingModalidad()
    if (activeModalidad !== null) {
      setFormState(activeModalidad)
    }
  }, [activeModalidad])

  return (
    <Box >
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeModalidad ? '' : 'none'}
        >
          <Alert severity='success' >{mensajeModalidad}</Alert>
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
                      Modalidad Laboral
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
                      lista.map((modalidad) => {
                        return (
                          <ListItem key={modalidad.modalidad_laboral}>
                            <ListItemText
                              primary={modalidad.modalidad_laboral}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, modalidad)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, modalidad)}
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
                      id='cod_modalidad'
                      autoComplete='false'
                      label='Código de la modalidad laboral'
                      type='text'
                      placeholder='Ingrese el código de la modalidad laboral'
                      fullWidth
                      name='cod_modalidad'
                      value={cod_modalidad || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='modalidad_laboral'
                      autoComplete='false'
                      label='Modalidad laboral'
                      type='text'
                      placeholder='Ingrese la modalidad laboral'
                      fullWidth
                      name='modalidad_laboral'
                      value={modalidad_laboral || ''}
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
