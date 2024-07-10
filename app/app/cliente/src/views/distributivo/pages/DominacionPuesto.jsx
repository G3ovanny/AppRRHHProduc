import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, Edit, Search } from '@mui/icons-material';
import { useAlertDialogStore, useForm } from '../../../hooks';
import { useDenominacionPuestoStore, useProcesoStore } from '../../../hooks/';
import { FiltroGeneral } from '../components/filtros/FiltroGeneral';
import { AlertDialog } from '../../../ui';

const formData = {
  cod_denominacion_puesto: '',
  denominacion_puesto: '',
  id_proceso: ''
}

export const DominacionPuesto = () => {
  const { listDenominacion, startDeletingDenominacion, setActiveDenominacion, startSavingDenominacion, startLoadingDenominacion, activeDenominacion, inicialDenominacion = [], mensajeDenominacion } = useDenominacionPuestoStore();
  const [resultadoBusqueda, setResultadoBusqueda] = useState('')
  const { listProceso, startLoadingProceso } = useProcesoStore()
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const content = '¿Está seguro que quiere eliminar el registro?'

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listDenominacion.filter((denominacion) => {
      return denominacion.denominacion_puesto.toLowerCase().includes(valorBuscar.toLowerCase()) || denominacion.cod_denominacion_puesto.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null


  if (!resultadoBusqueda) {
    lista = listDenominacion
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_denominacion_puesto: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    denominacion_puesto: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
  }

  const {
    cod_denominacion_puesto,
    denominacion_puesto,
    id_proceso,
    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    setActiveDenominacion(element)
    openAlertDialog(content)
    //startDeletingDenominacion(element)
  }

  const handleEdit = (e, element) => {
    setActiveDenominacion(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingDenominacion({ ...formState })
      onResetForm()
    }
  }

  const handleCancelar = () => {
    setActiveDenominacion(inicialDenominacion)
    onResetForm()
  }

  const handleConfirmation = () => {
    startDeletingDenominacion(activeDenominacion)
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  useEffect(() => {
    startLoadingDenominacion()
    startLoadingProceso()
    if (activeDenominacion !== null) {
      setFormState(activeDenominacion)
    }
  }, [activeDenominacion])
  return (
    <Box >
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeDenominacion ? '' : 'none'}
        >
          <Alert severity='success' >{mensajeDenominacion}</Alert>
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
                      Denominación del puesto
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
                      lista.map((denominacion) => {
                        return (
                          <ListItem key={denominacion.denominacion_puesto}>
                            <ListItemText
                              primary={denominacion.denominacion_puesto}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, denominacion)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, denominacion)}
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
                      id='cod_denominacion_puesto'
                      autoComplete='false'
                      label='Código denominacion del puesto'
                      type='text'
                      placeholder='Ingrese el código de la denominación del puesto'
                      fullWidth
                      name='cod_denominacion_puesto'
                      value={cod_denominacion_puesto || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='denominacion_puesto'
                      autoComplete='false'
                      label='Denominacion puesto'
                      type='text'
                      placeholder='Ingrese la denominacion del puesto'
                      fullWidth
                      name='denominacion_puesto'
                      value={denominacion_puesto || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">Procesos</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Procesos"
                        value={id_proceso || ''}
                        onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_proceso' } })}
                      >
                        {listProceso.map(option => (
                          <MenuItem key={option.id} value={option.id}> {option.proceso}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
