import { useState } from 'react'
import { useForm } from '../../../../hooks'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { nivelInstruccion, tipoRelacion } from './selects'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'

const formData = {
  tipo_relacion: '',
  apellidos: '',
  nombres: '',
  cedula: '',
  fecha_nacimiento: '',
  cargo: '',
}
export const InformacionFamiliares = () => {
  const {
    tipo_relacion,
    apellidos,
    nombres,
    cedula,
    fecha_nacimiento,
    cargo,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  //Guardo los deatos de cada hijo en un arreglo
  const [datosHijos, setDatosHijos] = useState([])

  const handleAddHijo = () => {
    setDatosHijos(prevDatosHijos => [...prevDatosHijos, formState]);
    onResetForm()
  };

  const handleDeleteHijo = () => {
    setDatosHijos(prevDatosHijos => {
      const nuevosDatosHijos = [...prevDatosHijos];
      nuevosDatosHijos.pop();
      return nuevosDatosHijos;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(datosHijos, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Información familiares</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
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
                placeholder='Ingrese los apellidos de su hijo'
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
                placeholder='Ingrese los nombres de su hijo'
                fullWidth
                name='nombres'
                value={nombres || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombres' } })}
              />
            </Grid>
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
                placeholder='Ingrese la cedula de residencia'
                fullWidth
                name='cedula'
                value={cedula || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'cedula' } })}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Nivel instrucción</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Nivel instrucción"
                  value={tipo_relacion || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_relacion' } })}
                >
                  {tipoRelacion.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='cargo'
                autoComplete='off'
                label='Ocupación'
                type='text'
                placeholder='Ingrese la ocupación de su hijo'
                fullWidth
                name='cargo'
                value={cargo || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'cargo' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              //sx={{ mt: 2, mb: 2 }}
              >
                <Button
                  disabled={formState.cedula === ''}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddHijo}
                >
                  Agregar
                </Button>
                <Button
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteHijo}
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
                    <TableCell align="center">Cédula</TableCell>
                    <TableCell align="center">Apellidos </TableCell>
                    <TableCell align="center">Nombres</TableCell>
                    <TableCell align="center">Fecha de nacimiento</TableCell>
                    <TableCell align="center">Nivel de instrucción</TableCell>
                    <TableCell align="center">Ocupación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosHijos.map((hijo, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{hijo.cedula}</TableCell>
                      <TableCell align="center">{hijo.apellidos}</TableCell>
                      <TableCell align="center">{hijo.nombres}</TableCell>
                      <TableCell align="center">{hijo.fecha_nacimiento}</TableCell>
                      <TableCell align="center">{hijo.tipo_relacion}</TableCell>
                      <TableCell align="center">{hijo.cargo}</TableCell>
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
