import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { tipoNacionalidad, tipoPublicacion, tipoQuartile, tipoSalida, tipoSector } from './selects'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const formData = {
  sector: '',
  nombre_institucion: '',
  ciudad: '',
  denominacion_cargo: '',
  responsabilidades: '',
  telefono: '',
  razon_salida: '',
  fecha_desde: '',
  fecha_hasta: '',
  tiempo_trabajo: '',
}
export const ExperienciaLaboral = ({ selectedTab, onFormSubmit }) => {
  const [experiencia, setExperiencia] = useState([])
  const {
    sector,
    nombre_institucion,
    ciudad,
    denominacion_cargo,
    responsabilidades,
    telefono,
    razon_salida,
    fecha_desde,
    fecha_hasta,
    tiempo_trabajo,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddExperiencia = () => {
    setExperiencia(prevExperiencia => [...prevExperiencia, formState]);
    onResetForm()
  };

  const handleDeleteExperiencia = () => {
    setExperiencia(prevExperiencia => {
      const nuevosExperiencia = [...prevExperiencia];
      nuevosExperiencia.pop();
      return nuevosExperiencia;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(experiencia, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Experiencia laboral</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Sector</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Sector"
                  value={sector || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'sector' } })}
                >
                  {tipoSector.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='nombre_institucion'
                autoComplete='off'
                label='Nombre de la institución'
                type='text'
                placeholder='Ingrese el nombre de la institución'
                fullWidth
                name='nombre_institucion'
                value={nombre_institucion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombre_institucion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='ciudad'
                autoComplete='off'
                label='Nombre de la cidudad'
                type='text'
                placeholder='Ingrese el nombre de la cidudad'
                fullWidth
                name='ciudad'
                value={ciudad || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'ciudad' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='denominacion_cargo'
                autoComplete='off'
                label='Denominación del cargo'
                type='text'
                placeholder='Ingrese la denominación del cargo'
                fullWidth
                name='denominacion_cargo'
                value={denominacion_cargo || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'denominacion_cargo' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='responsabilidades'
                autoComplete='off'
                label='Responsabilidades / Funciones'
                type='text'
                placeholder='Ingrese las responsabilidades / funciones'
                fullWidth
                name='responsabilidades'
                value={responsabilidades || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'responsabilidades' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //disabled={!estudia_actualmente}
                  //views={['year']}
                  id='fecha_desde'
                  label="Fecha de trabajo desde"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  value={dayjs(fecha_desde)}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_desde' } })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //disabled={!estudia_actualmente}
                  //views={['year']}
                  id='fecha_hasta'
                  label="Fecha de trabajo hasta"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  value={dayjs(fecha_hasta)}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_hasta' } })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='telefono'
                autoComplete='off'
                label='Teléfono'
                type='text'
                placeholder='Ingrese el teléfono'
                fullWidth
                name='telefono'
                value={telefono || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'telefono' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!sector}
                sx={{ minWidth: 180 }}
                size="small"
                id='tiempo_trabajo'
                autoComplete='off'
                label='Tiempo de trabajo'
                type='text'
                placeholder='Ingrese el tiempo de trabajo'
                fullWidth
                name='tiempo_trabajo'
                value={tiempo_trabajo || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'tiempo_trabajo' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-salida">Razones de salida</InputLabel>
                <Select
                  labelId="select-salida"
                  id="id-select-small"
                  label="Razones de salida"
                  value={razon_salida || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'razon_salida' } })}
                >
                  {tipoSalida.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  disabled={!denominacion_cargo}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddExperiencia}
                >
                  Agregar
                </Button>
                <Button
                  disabled={!experiencia.length >= 1}
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteExperiencia}
                >
                  Eliminar
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Toolbar />
          <Divider />
          <Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Sector</TableCell>
                    <TableCell align="center">Nombre de la institución</TableCell>
                    <TableCell align="center">Nombre de la ciudad</TableCell>
                    <TableCell align="center">Deominación del cargo</TableCell>
                    <TableCell align="center">Responsabilidades / Funciones</TableCell>
                    <TableCell align="center">Fecha de trabajo desde</TableCell>
                    <TableCell align="center">Fecha de trabajo hasta</TableCell>
                    <TableCell align="center">Tiempo de trabajo años / meses</TableCell>
                    <TableCell align="center">Teléfono fijo / celular</TableCell>
                    <TableCell align="center">Razones de salida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {experiencia.map((inst, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{inst.sector}</TableCell>
                      <TableCell align="center">{inst.nombre_institucion}</TableCell>
                      <TableCell align="center">{inst.ciudad}</TableCell>
                      <TableCell align="center">{inst.denominacion_cargo}</TableCell>
                      <TableCell align="center">{inst.responsabilidades}</TableCell>
                      <TableCell align="center">{inst.fecha_desde}</TableCell>
                      <TableCell align="center">{inst.fecha_hasta}</TableCell>
                      <TableCell align="center">{inst.tiempo_trabajo}</TableCell>
                      <TableCell align="center">{inst.telefono}</TableCell>
                      <TableCell align="center">{inst.razon_salida}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
