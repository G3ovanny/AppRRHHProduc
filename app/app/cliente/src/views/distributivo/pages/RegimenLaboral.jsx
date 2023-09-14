
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { CancelScheduleSend, Delete, DeleteOutline, Edit, Send } from '@mui/icons-material';
import { useRegimenStore } from '../../../hooks/distributivo';
import { useEffect, useState } from 'react';
import { useForm } from '../../../hooks';
import { FiltroGeneral } from '../components/filtros/FiltroGeneral';


const formData = {
  cod_regimen: '',
  regimen_laboral: ''
}

export const RegimenLaboral = () => {
  const { startSavingReg, startLoadingReg, startDeletingReg, listReg, setActiveReg, activeReg, inicialReg = [], mensaje } = useRegimenStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const handelBuscar = (valorBuscar) => {
    const resultadoFiltrado = listReg.filter((regimen) => {
      return regimen.regimen_laboral.toLowerCase().includes(valorBuscar.toLowerCase()) || regimen.cod_regimen.toLowerCase().includes(valorBuscar.toLowerCase())
    })
    setResultadoBusqueda(resultadoFiltrado)
  }

  let lista = null

  if (!resultadoBusqueda) {
    lista = listReg
  } else {
    lista = resultadoBusqueda
  }

  const formValidations = {
    cod_regimen: [
      (value) => !!value,
      'Error en el formulario'
    ],
    regimen_laboral: [
      (value) => !!value,
      'Error en el formulario'
    ],
  }

  const {
    cod_regimen,
    regimen_laboral,
    onInputChange,
    isFormValid,
    onResetForm,
    formState,
    setFormState } = useForm(formData, formValidations);

  const handleDelete = (e, element) => {
    startDeletingReg(element)
  }

  const handleEdit = (e, element) => {
    setActiveReg(element)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      await startSavingReg({ ...formState })
      onResetForm()
    }
  }

  const handleCancelar = () => {
    setActiveReg(inicialReg)
    onResetForm()
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  useEffect(() => {
    startLoadingReg()
    if (activeReg !== null) {
      setFormState(activeReg)
    }
  }, [activeReg])

  return (
    <Box>
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensaje ? '' : 'none'}
        >
          <Alert severity='success' >{mensaje}</Alert>
        </Grid>
      </Toolbar>
      <Grid
        component='div'
        container
        rowSpacing={1}
        columnSpacing={{ xs: 3, sm: 3, md: 3 }}
      >
        <Grid
          component='div'
          item
          s={12} sm={12} md={6}>
          <Card
            component='div'
          >
            <Grid
              component='div'
              item xs={12} sx={{ mt: 1 }}>
              <CardContent
                component='div'
              >

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                    <Typography>
                      Régimen Laboral
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mb: 3 }} >
                    <FiltroGeneral onBuscar={handelBuscar} />
                  </Grid>
                </Grid>
                <Divider />

                <Grid
                  component='div'
                  item xs={12} sx={{ mt: 1 }}>
                  <List
                    component='div'
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
                      lista.map((regimen) => {
                        return (
                          <ListItem
                            component='div'
                            key={regimen.regimen_laboral}>
                            <ListItemText
                              component='div'
                              primary={regimen.regimen_laboral}
                            //secondary={secondary ? 'Secondary text' : null}
                            />
                            <Tooltip title="Eliminar" color="error">
                              <IconButton
                                onClick={e => handleDelete(e, regimen)}
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" color='secondary'>
                              <IconButton
                                onClick={e => handleEdit(e, regimen)}
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
          <Card
            component='div'
          >
            <form
              component='div'
              onSubmit={onSubmit}>
              <Grid
                component='div'
                item xs={12} sx={{ mt: 1 }}>
                <CardContent
                  component='div'
                >
                  <Grid
                    component='div'
                    item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='cod_regimen'
                      autoComplete='false'
                      label='Código del régimen laboral'
                      type='text'
                      placeholder='Ingrese el código del régimen'
                      fullWidth
                      name='cod_regimen'
                      value={cod_regimen || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                  <Grid
                    component='div'
                    item xs={12} sx={{ mt: 1 }}>
                    <TextField sx={{ minWidth: 180 }} size="small"
                      id='regimen_laboral'
                      autoComplete='false'
                      label='Régimen laboral'
                      type='text'
                      placeholder='Ingrese el nombre del régimen laboral'
                      fullWidth
                      name='regimen_laboral'
                      value={regimen_laboral || ''}
                      onChange={onInputChange}
                    />

                  </Grid>
                </CardContent>
                <CardActions
                  component='div'
                >
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
