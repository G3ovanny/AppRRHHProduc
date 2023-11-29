import { useState } from 'react'
import { useForm } from '../../../../hooks'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Box, Button, Divider, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { nivelInstruccion, tipoCertificado, tipoCurso } from './selects'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'

const formData = {
  nombre_curso: '',
  tipo_curso: '',
  institucion: '',
  pais: '',
  duracion: '',
  tipo_certificado: '',
  fecha_fin: '',
  fecha_inicio: '',
}

export const Capacitaciones = ({selectedTab, onFormSubmit }) => {
  const [cursos, setCursos] = useState([])
  const {
    nombre_curso,
    tipo_curso,
    institucion,
    pais,
    duracion,
    tipo_certificado,
    fecha_fin,
    fecha_inicio,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddTitulo = () => {
    setCursos(prevCursos => [...prevCursos, formState]);
    onResetForm()
  };

  const handleDeleteFamiliar = () => {
    setCursos(prevCursos => {
      const nuevosCursos = [...prevCursos];
      nuevosCursos.pop();
      return nuevosCursos;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(cursos, selectedTab);
  };

  return (
    <Box>
      <Typography align='center'>Eventos de capacitación</Typography>
      <Toolbar />
      <Typography align='left' fontFamily='serif'>Ingrese sus capacitaciones de los ultimos 2 años</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='nombre_curso'
                autoComplete='off'
                label='Nombre del curso'
                type='text'
                placeholder='Ingrese el nombre del curso'
                fullWidth
                name='nombre_curso'
                value={nombre_curso || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombre_curso' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-curso">Tipo del curso</InputLabel>
                <Select
                  labelId="select-curso"
                  id="id-select-small"
                  label="Tipo del curso"
                  value={tipo_curso || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_curso' } })}
                >
                  {tipoCurso.map(option => (
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
                id='pais'
                autoComplete='off'
                label='País'
                type='text'
                placeholder='Ingrese el país'
                fullWidth
                name='pais'
                value={pais || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'pais' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='institucion'
                autoComplete='off'
                label='Institución'
                type='text'
                placeholder='Ingrese la institución'
                fullWidth
                name='institucion'
                value={institucion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'institucion' } })}
              />
            </Grid>


            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='duracion'
                autoComplete='off'
                label='Duración en horas'
                type='text'
                placeholder='Ingrese la duracioón en horas'
                fullWidth
                name='duracion'
                value={duracion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'duracion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Tipo de certificado</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Tipo de certificado"
                  value={tipo_certificado || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_certificado' } })}
                >
                  {tipoCertificado.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_inicio'
                  label="Fecha inicio"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_inicio' } })}
                  value={dayjs(fecha_inicio)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_fin'
                  label="Fecha fin"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_fin' } })}
                  value={dayjs(fecha_fin)}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              //sx={{ mt: 2, mb: 2 }}
              >
                <Button
                  disabled={formState.duracion === ''}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddTitulo}
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
                    <TableCell align="center">Nombre del curso</TableCell>
                    <TableCell align="center">Tipo del curso</TableCell>
                    <TableCell align="center">Intitución</TableCell>
                    <TableCell align="center">País </TableCell>
                    <TableCell align="center">Duración en horas</TableCell>
                    <TableCell align="center">Tipo de certificado</TableCell>
                    <TableCell align="center">Fecha inicio</TableCell>
                    <TableCell align="center">Fecha fin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cursos.map((curso, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{curso.nombre_curso}</TableCell>
                      <TableCell align="center">{curso.tipo_curso}</TableCell>
                      <TableCell align="center">{curso.institucion}</TableCell>
                      <TableCell align="center">{curso.pais}</TableCell>
                      <TableCell align="center">{curso.duracion}</TableCell>
                      <TableCell align="center">{curso.tipo_certificado}</TableCell>
                      <TableCell align="center">{curso.fecha_inicio}</TableCell>
                      <TableCell align="center">{curso.fecha_fin}</TableCell>

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
