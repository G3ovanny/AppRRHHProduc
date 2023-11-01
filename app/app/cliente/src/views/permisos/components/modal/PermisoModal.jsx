import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { BaseModal } from '../../../../ui'
import { Alert, Autocomplete, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField, Toolbar, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm, useModalStore, useMotivoPermisoStore, usePermisoStore, useTrabStore } from '../../../../hooks'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '72%',
  overflow: 'auto',
  bgcolor: 'background.paper',
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
  horas_almuerzo: '',
  otra_hora: '',
  certificado_medico: '',
  detalle: '',
}

const minutosADecimal = (otra_hora) => {
  const [horas, minutosStr] = otra_hora.split(':');
  const minutosFraccion = parseInt(minutosStr, 10) / 60;
  return parseInt(horas, 10) + minutosFraccion;
}

export const PermisoModal = ({ titleModal }) => {
  const { closeModal } = useModalStore();
  const { trabajadores, startLoadingTrab, } = useTrabStore()
  const { activePermiso, startSavingPermiso } = usePermisoStore();
  const { listMotivo, startLoadingMotivo } = useMotivoPermisoStore();
  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [tipoEnf, setTipoEnf] = useState(false)
  const [horarioAlm, setHorarioAlm] = useState(true)
  const [tiempoResta, setTiempoResta] = useState('');

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
      (value) => !!value,
      'El campo es obligatorio'
    ],
    fecha_hora_llegada: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
  }

  let trabajador = [];
  const {
    id_trabajador,
    id_motivo,
    fecha_hora_salida,
    fecha_hora_llegada,
    horas_almuerzo,
    otra_hora,
    certificado_medico,
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
      //startSavingPermiso(formState)
      console.log(formState)
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


  setTimeout(() => {
    setErrorMessage('');
  }, 3000);

  if (id_trabajador) {
    let lista_trabajadores = trabajadores.filter(trab => trab.id === id_trabajador)
    trabajador = lista_trabajadores[0]
  } else {
    const mensaje = "Ingrese la cédula del servidor"

  }
  // esta funcion me permite analisar la hora de llegada, la hora de almuerzo y presentar los dias y la hora del permiso para presentarlo en el formulario
  const diferenciaHora = (salida, llegada, almuerzo) => {
    const fechaSalida = dayjs(salida);
    const fechaLlegada = dayjs(llegada);
    if (fechaLlegada.isBefore(fechaSalida)) {
      setErrorMessage('La fecha y hora de llegada debe ser mayor que la de salida')
    }

    const diferenciaMinutos = fechaLlegada.diff(fechaSalida, "minutes");

    let minutos = diferenciaMinutos;

    if (almuerzo === "restar_dos") {
      minutos -= 2 * 60; // Restar 2 horas (en minutos)
    } else if (almuerzo === "otro") {
      if (otra_hora) {
        const minutosRestar = minutosADecimal(otra_hora);
        minutos -= Math.floor(minutosRestar * 60); // Restar los minutos
      }
    }

    const dias = Math.floor(minutos / (24 * 60)); // Días completos
    minutos %= 24 * 60; // Minutos restantes después de restar los días
    const horas = Math.floor(minutos / 60); // Horas completas
    minutos %= 60; // Minutos restantes

    const horasFormateadas = dayjs()
      .hour(horas)
      .minute(minutos)
      .format("HH:mm");

    if (dias > 0) {
      return `${dias} días ${horasFormateadas} horas`;
    } else {
      return `${horasFormateadas} horas`;
    }

  }

  useEffect(() => {
    diferenciaHora(fecha_hora_salida, fecha_hora_llegada)
    const resultado = diferenciaHora(fecha_hora_salida, fecha_hora_llegada, horas_almuerzo);
    setTiempoResta(resultado);
  }, [fecha_hora_llegada, horas_almuerzo, otra_hora])

  useEffect(() => {
    startLoadingTrab()
    startLoadingMotivo()
    if (activePermiso !== null) {
      setFormState({ ...activePermiso[0] });
    }
  }, [activePermiso])

  useEffect(() => {
    if (horas_almuerzo == 'otro') {
      setHorarioAlm(false)
    } else {
      setHorarioAlm(true)
    }

  }, [horas_almuerzo])

  const motEnfermedad = listMotivo.filter(tipo => tipo.motivo == 'ENFERMEDAD');
  useEffect(() => {
    if (id_motivo) {
      const motEnfId = motEnfermedad[0].id
      if (id_motivo == motEnfId) {
        setTipoEnf(true)
      } else {
        setTipoEnf(false)
      }
    }
  })


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
              <Grid item xs sx={{ mt: 2 }}>
                <Autocomplete
                  error={id_trabajadorValid !== null}
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
              <Grid item xs sx={{ mt: 2 }}>
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
              <Grid item xs sx={{ mt: 2 }}>
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
              <Grid item xs sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  id="outlined-read-only-input"
                  label="Dias de vacaciones"
                  defaultValue={trabajador.dias_vacaciones}
                  readOnly
                  fullWidth
                  value={trabajador.dias_vacaciones || ''}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
            <Typography>Datos del permiso</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    errors={fecha_hora_salidaValid !== null}
                    id='fecha_hora_salida'
                    label="Fecha y hora de salida"
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{ minWidth: 150 }} size="small"
                    views={['year', 'day', 'hours', 'minutes']}
                    onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DDTHH:mm'), name: 'fecha_hora_salida' } })}
                    value={dayjs(fecha_hora_salida)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha y hora de llegada"
                    slotProps={{ textField: { size: 'small' } }}
                    id='fecha_hora_llegada'
                    value={dayjs(fecha_hora_llegada)}
                    onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DDTHH:mm'), name: 'fecha_hora_llegada' } })}
                    sx={{ minWidth: 150 }} size="small"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  id="outlined-read-only-input"
                  label="Tiempo total a tomar"
                  defaultValue={tiempoResta}
                  readOnly
                  fullWidth
                  value={tiempoResta || ''}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs sx={{ mt: 2 }}>
                <FormControl
                  sx={{ minWidth: 215, maxWidth: 215 }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-label">Motivo del permiso</InputLabel>
                  <Select
                    error={id_motivoValid !== null}
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
              <Grid item xs sx={{ mt: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    disabled={!tipoEnf}
                    control={
                      <Checkbox
                        checked={certificado_medico || false}
                        onChange={e => onInputChange({ target: { value: e.target.checked, name: 'certificado_medico' } })}

                      />
                    }
                    label="Certificado médico" />
                </FormGroup>
              </Grid>

            </Grid>
            <Typography>Horas de almuerzo diarias</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="horas_almuerzo"
                    value={horas_almuerzo || 'no_restar'}
                    onChange={e => onInputChange({ target: { value: e.target.value, name: 'horas_almuerzo' } })}
                  >
                    <FormControlLabel value={'no_restar'} control={<Radio />} label="Sin horas de almuerzo" />
                    <FormControlLabel value={'restar_dos'} control={<Radio />} label="2 horas de almuezo dirias" />
                    <FormControlLabel value={'otro'} control={<Radio />} label="Otro valor" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ mt: 2 }}>
                <TextField
                  disabled={horarioAlm}
                  sx={{ minWidth: 180 }}
                  size="small"
                  type="time"
                  id="outlined-read-only-input"
                  label="Horas de almuerzo diarias"
                  value={otra_hora || '00:00'}
                  name='otra_hora'
                  onChange={onInputChange}
                  format="HH:mm"
                />
              </Grid>
            </Grid>

            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={12}>
                <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                  <Typography>Detalle del permiso</Typography>
                  <TextField
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
          </Grid>
          <Divider />
          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
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