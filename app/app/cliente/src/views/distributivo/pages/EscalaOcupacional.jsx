import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { useAlertDialogStore, useEscalaOcupacionalStore, useForm } from '../../../hooks';
import { FiltroGeneral } from '../components/filtros';
import { AlertDialog } from '../../../ui';

const formData = {
  cod_escala_ocupacional: '',
  escala_ocupacional: ''
}

export const EscalaOcupacional = () => {

  const { listEscala, startDeletingEscala, setActiveEscala, startSavingEscala, startLoadingEscala, activeEscala, inicialEscala = [], mensajeEscala, mensajeError } = useEscalaOcupacionalStore();
  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const content = '¿Está seguro que quiere eliminar el registro?'

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listEscala.filter((escala) => {
      return escala.escala_ocupacional.toLowerCase().includes(valorBuscar.toLowerCase()) || escala.cod_escala_ocupacional.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null


  if (!resultadoBusqueda) {
    lista = listEscala
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_escala_ocupacional: [
      (value) => !!value,
      'Error en el formulario'
    ],
    escala_ocupacional: [
      (value) => !!value,
      'Error en el formulario'
    ],
  }
  const {
    cod_escala_ocupacional,
    escala_ocupacional,
    onInputChange,
    isFormValid,
    onResetForm,
    formState,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    setActiveEscala(element)
    openAlertDialog(content)
    //startDeletingEscala(element)
  }

  const handleEdit = (e, element) => {
    setActiveEscala(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingEscala({ ...formState })
      onResetForm()
    }
  }
  const handleCancelar = () => {
    setActiveEscala(inicialEscala)
    onResetForm()
  }

  const handleConfirmation = () => {
    startDeletingEscala(activeEscala)
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };


  let mensaje = null
  if (mensajeEscala) {
    mensaje = <Alert severity='success'>{mensajeEscala}</Alert>;
  } else if (mensajeError) {
    mensaje = <Alert severity='error'>{mensajeError}</Alert>;
  } else {
    mensaje  // No se muestra ningún mensaje si no hay ni éxito ni error
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  useEffect(() => {
    startLoadingEscala()
    if (activeEscala !== null) {
      setFormState(activeEscala)
    }
  }, [activeEscala])

  return (
    <Box>
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeEscala || !!mensajeError ? '' : 'none'}
        >
          {mensaje}
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
                      Escala Ocupacional
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
                      lista.map((escala) => {
                        return (
                          <ListItem key={escala.escala_ocupacional}>
                            <ListItemText
                              primary={escala.escala_ocupacional}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, escala)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, escala)}
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
                      id='cod_escala_ocupacional'
                      autoComplete='false'
                      label='Código de la escala ocupacional'
                      type='text'
                      placeholder='Ingrese el código de la escala ocupacional'
                      fullWidth
                      name='cod_escala_ocupacional'
                      value={cod_escala_ocupacional || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='escala_ocupacional'
                      autoComplete='false'
                      label='Escala Ocupacional'
                      type='text'
                      placeholder='Ingrese la escala ocupacional'
                      fullWidth
                      name='escala_ocupacional'
                      value={escala_ocupacional || ''}
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
    </Box>
  )
}
