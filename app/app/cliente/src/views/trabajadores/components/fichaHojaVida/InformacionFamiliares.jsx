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
  cargo: '',
}
export const InformacionFamiliares = ({ selectedTab, onFormSubmit }) => {
  const [datosFamiliar, setDatosFamiliar] = useState([])
  const {
    tipo_relacion,
    apellidos,
    nombres,
    cedula,
    cargo,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  //Guardo los deatos de cada hijo en un arreglo

  const handleAddFamiliar = () => {
    setDatosFamiliar(prevDatosFamiliar => [...prevDatosFamiliar, formState]);
    onResetForm()
  };

  const handleDeleteFamiliar = () => {
    setDatosFamiliar(prevDatosFamiliar => {
      const nuevosDatosFamiliar = [...prevDatosFamiliar];
      nuevosDatosFamiliar.pop();
      return nuevosDatosFamiliar;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(datosFamiliar, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Información familiares</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-relacion">Tipo de relación</InputLabel>
                <Select
                  labelId="select-relacion"
                  id="id-select-small"
                  label="Tipo de relación"
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
                id='cedula'
                autoComplete='off'
                label='Cédula'
                type='text'
                placeholder='Ingrese la cedula del familiar'
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
                placeholder='Ingrese los apellidos del familiar'
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
                placeholder='Ingrese los nombres del familiar'
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
                id='cargo'
                autoComplete='off'
                label='Cargo en institución'
                type='text'
                placeholder='Ingrese el cargo del familiar en la institución'
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
                  onClick={handleAddFamiliar}
                >
                  Agregar
                </Button>
                <Button
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteFamiliar}
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
                    <TableCell align="center">Nivel de instrucción</TableCell>
                    <TableCell align="center">Cargo en institución</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosFamiliar.map((familiar, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{familiar.cedula}</TableCell>
                      <TableCell align="center">{familiar.tipo_relacion}</TableCell>
                      <TableCell align="center">{familiar.apellidos}</TableCell>
                      <TableCell align="center">{familiar.nombres}</TableCell>
                      <TableCell align="center">{familiar.cargo}</TableCell>
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
