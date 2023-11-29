import React from 'react'
import { useForm } from '../../../../hooks'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { SaveAltOutlined } from '@mui/icons-material'

const formData = {
  cedula: '',
  apellidos: '',
  nombres: '',
  fecha_nacimiento: '',
  edad: '',
  telefono_celular: '',
  nivel_instruccion: '',
  correo_personal: '',
  ocupacion: '',
  lugar_trabajo: '',
  telefono_trabajo: '',
}
export const InformacionConyuge = ({ selectedTab, onFormSubmit }) => {
  const {
    cedula,
    apellidos,
    nombres,
    fecha_nacimiento,
    edad,
    telefono_celular,
    nivel_instruccion,
    correo_personal,
    ocupacion,
    lugar_trabajo,
    telefono_trabajo,

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
      <Typography align='center'>Información conyuge y/o compañero</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='cedula'
                autoComplete='off'
                label='Cédula'
                type='text'
                placeholder='Ingrese la cédula'
                fullWidth
                name='cedula'
                value={cedula || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'cedula' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='apellidos'
                autoComplete='off'
                label='Apellidos'
                type='text'
                placeholder='Ingrese los apellidos'
                fullWidth
                name='apellidos'
                value={apellidos || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'apellidos' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='nombres'
                autoComplete='off'
                label='Nombres'
                type='text'
                placeholder='Ingrese los nombres'
                fullWidth
                name='nombres'
                value={nombres || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombres' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_nacimiento'
                  label="Fecha de nacimiento"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_nacimiento' } })}
                  value={dayjs(fecha_nacimiento)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='edad'
                autoComplete='off'
                label='Edad'
                type='text'
                placeholder='Ingrese la edad'
                fullWidth
                name='edad'
                value={edad || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'edad' } })}
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
                label='Número de telefono'
                type='text'
                placeholder='Ingrese el número de teléfono'
                fullWidth
                name='telefono_celular'
                value={telefono_celular || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'telefono_celular' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='nivel_instruccion'
                autoComplete='off'
                label='Nivel de instrucción'
                type='text'
                placeholder='Ingrese el nivel instrucción'
                fullWidth
                name='nivel_instruccion'
                value={nivel_instruccion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nivel_instruccion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='correo_personal'
                autoComplete='off'
                label='Correo personal'
                type='text'
                placeholder='Ingrese el correo personal'
                fullWidth
                name='correo_personal'
                value={correo_personal || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'correo_personal' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='ocupacion'
                autoComplete='off'
                label='Ocupación'
                type='text'
                placeholder='Ingrese la ocupación'
                fullWidth
                name='ocupacion'
                value={ocupacion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'ocupacion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='lugar_trabajo'
                autoComplete='off'
                label='El lugar de trabajo'
                type='text'
                placeholder='Ingrese el lugar de trabajo'
                fullWidth
                name='lugar_trabajo'
                value={lugar_trabajo || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'lugar_trabajo' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='telefono_trabajo'
                autoComplete='off'
                label='Teléfono de trabajo'
                type='text'
                placeholder='Ingrese el teléfono de trabajo'
                fullWidth
                name='telefono_trabajo'
                value={telefono_trabajo || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'telefono_trabajo' } })}
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
