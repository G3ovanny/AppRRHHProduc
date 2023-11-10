import { SaveAltOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from '../../../../hooks'

const formData = {
  provincia: '',
  ciudad: '',
  parroquia: '',
  barrio: '',
  calle_principal: '',
  num_calle: '',
  calle_secundaria: '',
  telefono_domicilio: '',
  edificio: '',
  num_departamento: '',
  conjunto_residencial: '',
  telefono_celular: '',
}

export const DireccionPermanente = ({selectedTab, onFormSubmit }) => {
  const {
    provincia,
    ciudad,
    parroquia,
    barrio,
    calle_principal,
    num_calle,
    calle_secundaria,
    telefono_domicilio,
    edificio,
    num_departamento,
    conjunto_residencial,
    telefono_celular,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(formState, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Dirección Permanente</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='provincia'
                autoComplete='off'
                label='Provincia'
                type='text'
                placeholder='Ingrese la provincia de residencia'
                fullWidth
                name='provincia'
                value={provincia || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'provincia' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='ciudad'
                autoComplete='off'
                label='Ciudad'
                type='text'
                placeholder='Ingrese la ciudad de residencia'
                fullWidth
                name='ciudad'
                value={ciudad || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'ciudad' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='parroquia'
                autoComplete='off'
                label='Parroquia'
                type='text'
                placeholder='Ingrese la parroquia de residencia'
                fullWidth
                name='parroquia'
                value={parroquia || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'parroquia' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='barrio'
                autoComplete='off'
                label='Barrio'
                type='text'
                placeholder='Ingrese el barrio de residencia'
                fullWidth
                name='barrio'
                value={barrio || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'barrio' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='calle_principal'
                autoComplete='off'
                label='Calle principal'
                type='text'
                placeholder='Ingrese la calle principal de residencia'
                fullWidth
                name='calle_principal'
                value={calle_principal || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'calle_principal' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='num_calle'
                autoComplete='off'
                label='Número de calle'
                type='text'
                placeholder='Ingrese el número de calle'
                fullWidth
                name='num_calle'
                value={num_calle || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_calle' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='calle_secundaria'
                autoComplete='off'
                label='Calle secundaria'
                type='text'
                placeholder='Ingrese la calle secundaria'
                fullWidth
                name='calle_secundaria'
                value={calle_secundaria || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'calle_secundaria' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='telefono_domicilio'
                autoComplete='off'
                label='Telefono domicilio'
                type='text'
                placeholder='Ingrese su teléfono de domicilio'
                fullWidth
                name='telefono_domicilio'
                value={telefono_domicilio || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'telefono_domicilio' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='edificio'
                autoComplete='off'
                label='Edificio'
                type='text'
                placeholder='Ingrese el edificio de residencia'
                fullWidth
                name='edificio'
                value={edificio || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'edificio' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='num_departamento'
                autoComplete='off'
                label='Número de departamento'
                type='text'
                placeholder='Ingrese el número de su departamento'
                fullWidth
                name='num_departamento'
                value={num_departamento || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_departamento' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='conjunto_residencial'
                autoComplete='off'
                label='Conjunto residencial'
                type='text'
                placeholder='Ingrese el conjunto residencial'
                fullWidth
                name='conjunto_residencial'
                value={conjunto_residencial || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'conjunto_residencial' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='telefono_celular'
                autoComplete='off'
                label='Teléfono celular'
                type='text'
                placeholder='Ingrese su teléfono celular'
                fullWidth
                name='telefono_celular'
                value={telefono_celular || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'telefono_celular' } })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack
        direction='row'
        spacing={2}
        sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          endIcon={<SaveAltOutlined />}
          onClick={handleSubmit}
        >
          Guardar datos antes de enviar
        </Button>
      </Stack>
    </Box>
  )
}
