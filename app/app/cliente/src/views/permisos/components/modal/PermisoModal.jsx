import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../../ui'
import { Alert, Autocomplete, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useForm, useModalStore, useMotivoPermisoStore, usePermisoStore, useTrabStore } from '../../../../hooks'
import { CancelScheduleSend, Send } from '@mui/icons-material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '72%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const formData = {
  id_trabajador: '',
  id_motivo: '',
  fecha_hora_salida: '',
  fecha_hora_llegada: '',
  detalle: '',
}

export const PermisoModal = ({ titleModal }) => {
  const { closeModal } = useModalStore();
  const { trabajadores, startLoadingTrab, } = useTrabStore()
  const { activePermiso, startSavingPermiso } = usePermisoStore();
  const { listMotivo, startLoadingMotivo } = useMotivoPermisoStore();
  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const formValidations = {
    id_trabajador: [
      (value) => {
        if (!value) {
          return setErrorMessage('Ingrese el número de cédula del servidor')
        }
        return 'El campo es obligatorio'
      }
    ],
    id_motivo: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    fecha_hora_salida: [
      (value) => !!value && value.length > 0 !== '',
      'El campo es obligatorio'
    ],
    fecha_hora_llegada: [
      (value) => {
        if (!!value && value !== '') {
          if (!!fecha_hora_salida.length > 0) {
            console.log('Fecha existe', fecha_hora_salida)
          }
          return value > fecha_hora_salida || setErrorMessage('La hora de llegada debe ser mayor que la hora de salida.');
        }
        return 'El campo es obligatorio';
      }
    ]
  }

  let trabajador = [];
  const {
    id_trabajador,
    id_motivo,
    fecha_hora_salida,
    fecha_hora_llegada,
    detalle,
    id_trabajadorValid,
    id_motivoValid,
    fecha_hora_salidaValid,
    fecha_hora_llegadaValid,
    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState
  } = useForm(formData, formValidations);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      startSavingPermiso(formState)
      closeModal()
      onResetForm()
    } else {
      console.log(formState)
      setErrorMessage('Error en el formulario')
    }
  }
  const handleCancel = () => {
    closeModal()
    onResetForm()
  }
  useEffect(() => {
    startLoadingTrab()
    startLoadingMotivo()
    if (activePermiso !== null) {
      setFormState({ ...activePermiso[0] });
    }
  }, [activePermiso])

  setTimeout(() => {
    setErrorMessage('');
  }, 3000);

  if (id_trabajador) {
    let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trabajador)
    trabajador = lista_trabajadores[0]
    //component = {}
  } else {
    const mensaje = "Ingrese la cédula del servidor"
    //component = {}
  }
  return (
    <BaseModal
      title={titleModal}
      style={style}
    >
      <Box>
        <form onSubmit={onSubmit}>
          <Grid item
            xs={12}
            //display= {true}
            display={!!errorMessage ? '' : 'none'}
          >
            <Alert severity='error' >{errorMessage}</Alert>
          </Grid>
          <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            <Typography>Datos del servidor</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                <Autocomplete
                  error={id_trabajadorValid !== null}
                  helperText={id_trabajadorValid}
                  size='small'
                  inputValue={inputValue || ''}
                  onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
                  onChange={(e, valor) => {
                    if (valor && valor.id) {
                      onInputChange({ target: { value: valor.id, name: 'id_trabajador' } })
                    }
                  }
                  }
                  id="controllable-states-demo"
                  options={trabajadores}
                  getOptionLabel={(options) => options.numero_identificacion}
                  renderInput={(params) => <TextField {...params} label="Seleccione la cédula del servidor" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  id="outlined-read-only-input"
                  label="Cédula"
                  defaultValue={trabajador.numero_identificacion}
                  readOnly
                  fullWidth
                  value={trabajador.numero_identificacion || ''}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  id="outlined-read-only-input"
                  label="Nombres"
                  defaultValue={trabajador.nombres}
                  readOnly
                  fullWidth
                  value={trabajador.nombres || ''}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
            <Typography>Datos del permiso</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    error={fecha_hora_salidaValid !== null}
                    helperText={fecha_hora_salidaValid}
                    id='fecha_hora_salida'
                    label="Fecha y hora de salida"
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{ minWidth: 150 }} size="small"
                    views={['year', 'day', 'hours', 'minutes']}
                    //format="D/M/YYYY - HH:mm"
                    onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DDTHH:mm'), name: 'fecha_hora_salida' } })}
                    value={dayjs(fecha_hora_salida)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    //format="D/M/YYYY - HH:mm"
                    error={fecha_hora_llegadaValid !== null}
                    helperText={fecha_hora_llegadaValid}
                    label="Fecha y hora de llegada"
                    slotProps={{ textField: { size: 'small' } }}
                    id='fecha_hora_llegada'
                    value={dayjs(fecha_hora_llegada)}
                    onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DDTHH:mm'), name: 'fecha_hora_llegada' } })}
                    sx={{ minWidth: 150 }} size="small"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={3} sx={{ mt: 2 }}>
                <FormControl
                  sx={{ minWidth: 185 }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-label">Motivo del permiso</InputLabel>
                  <Select
                    error={id_motivoValid !== null}
                    helperText={id_motivoValid}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Nivel ocupacional"
                    value={id_motivo || ''}
                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'id_motivo' } })}
                  >
                    {listMotivo.map(option => (
                      <MenuItem key={option.id} value={option.id}>{option.motivo}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                    <Typography>Detalle del permiso</Typography>
                    <TextField
                      //error={detalleValid !== null}
                      //helperText={detalleValid}
                      id='Detalle'
                      type='text'
                      autoComplete='false'
                      sx={{ minWidth: 180 }}
                      size="small"
                      label='Ingrese el detalle del permiso'
                      fullWidth
                      placeholder="Detalle del permiso"
                      multiline
                      rows={4}
                      name='detalle'
                      value={detalle || ''}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* <Toolbar/> */}
            </Grid>
          </Grid>
          <Divider />
          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
            //startIcon={<CancelScheduleSend />}
            //onClick={handleCancelarEnvio}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              //endIcon={<Send />}
              onClick={onSubmit}
              disabled={!isFormValid}
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </Box>
    </BaseModal>
  )
}