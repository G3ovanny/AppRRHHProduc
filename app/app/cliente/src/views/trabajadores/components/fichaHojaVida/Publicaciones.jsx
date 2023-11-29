import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { tipoNacionalidad, tipoPublicacion, tipoQuartile } from './selects'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const formData = {
  tipo_publicacion: '',
  nombre_publicacion: '',
  nombre_revista: '',
  identificador_bibliografico: '',
  tipo_quartile: '',
  tipo_nacionalidad: '',
  anio_publicacion: '',
}
export const Publicaciones = ({ selectedTab, onFormSubmit }) => {
  const [institucion, setInstitucion] = useState([])
  const {
    tipo_publicacion,
    nombre_publicacion,
    nombre_revista,
    identificador_bibliografico,
    tipo_quartile,
    tipo_nacionalidad,
    anio_publicacion,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddInstitucion = () => {
    setInstitucion(prevInstitucion => [...prevInstitucion, formState]);
    onResetForm()
  };

  const handleDeleteInstitucion = () => {
    setInstitucion(prevInstitucion => {
      const nuevosInstitucion = [...prevInstitucion];
      nuevosInstitucion.pop();
      return nuevosInstitucion;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(institucion, selectedTab);
  };

  return (
    <Box>
      <Typography align='center'>Publicaciones científicas realizadas (de los ultimos 5 años)</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Tipo de publicación</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Tipo de publicación"
                  value={tipo_publicacion || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_publicacion' } })}
                >
                  {tipoPublicacion.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!tipo_publicacion}
                sx={{ minWidth: 180 }}
                size="small"
                id='nombre_publicacion'
                autoComplete='off'
                label='Nombre de la publicación'
                type='text'
                placeholder='Ingrese el nombre de la publicación'
                fullWidth
                name='nombre_publicacion'
                value={nombre_publicacion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombre_publicacion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!tipo_publicacion}
                sx={{ minWidth: 180 }}
                size="small"
                id='nombre_revista'
                autoComplete='off'
                label='Nombre de la revista, libro, etc.'
                type='text'
                placeholder='Ingrese el nombre de la revista, libro, etc'
                fullWidth
                name='nombre_revista'
                value={nombre_revista || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombre_revista' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!tipo_publicacion}
                sx={{ minWidth: 180 }}
                size="small"
                id='identificador_bibliográfico'
                autoComplete='off'
                label='Identificador bibliográfico'
                type='text'
                placeholder='Ingrese el identificador bibliográfico'
                fullWidth
                name='identificador_bibliografico'
                value={identificador_bibliografico || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'identificador_bibliografico' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-quartile">Tipo de quartile</InputLabel>
                <Select
                  labelId="select-quartile"
                  id="id-select-small"
                  label="tipo_quartile"
                  value={tipo_quartile || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_quartile' } })}
                >
                  {tipoQuartile.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Nacional/Intenacional</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Nacional/Intenacional"
                  value={tipo_nacionalidad || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_nacionalidad' } })}
                >
                  {tipoNacionalidad.map(option => (
                    <MenuItem key={option.value} value={option.value}> {option.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //disabled={!estudia_actualmente}
                  views={['year']}
                  id='anio_publicacion'
                  label="Año de publicación "
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  value={dayjs(anio_publicacion)}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'anio_publicacion' } })}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  disabled={!identificador_bibliografico}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddInstitucion}
                >
                  Agregar
                </Button>
                <Button
                  disabled={!institucion.length >= 1}
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteInstitucion}
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
                    <TableCell align="center">Tipo de publicación</TableCell>
                    <TableCell align="center">Nombre de publicación</TableCell>
                    <TableCell align="center">Nombre de revista, libro, etc</TableCell>
                    <TableCell align="center">Identificador bibliográfico</TableCell>
                    <TableCell align="center">Quartile</TableCell>
                    <TableCell align="center">Nacional/Internacional</TableCell>
                    <TableCell align="center">Año de publicación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {institucion.map((inst, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{inst.tipo_publicacion}</TableCell>
                      <TableCell align="center">{inst.nombre_publicacion}</TableCell>
                      <TableCell align="center">{inst.nombre_revista}</TableCell>
                      <TableCell align="center">{inst.identificador_bibliografico}</TableCell>
                      <TableCell align="center">{inst.tipo_quartile}</TableCell>
                      <TableCell align="center">{inst.tipo_nacionalidad}</TableCell>
                      <TableCell align="center">{inst.anio_publicacion}</TableCell>
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
