import { useState } from 'react'
import { useForm } from '../../../../hooks'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Box, Button, Divider, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { nivelInstruccion } from './selects'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'

const formData = {
  nivel_instruccion: '',
  pais: '',
  titulo_obtenido: '',
  periodos_aprobados: '',
  institucion: '',
  num_registro: '',
  area_conocimiento: '',
  fecha_registro: '',
}

export const FormacionAcademica = ({selectedTab, onFormSubmit }) => {
  const [datosTitulos, setDatosTitulos] = useState([])
  const {
    nivel_instruccion,
    pais,
    titulo_obtenido,
    periodos_aprobados,
    institucion,
    num_registro,
    area_conocimiento,
    fecha_registro,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)
  //Guardo los deatos de cada hijo en un arreglo

  const handleAddTitulo = () => {
    setDatosTitulos(prevDatosTitulos => [...prevDatosTitulos, formState]);
    onResetForm()
  };

  const handleDeleteFamiliar = () => {
    setDatosTitulos(prevDatosTitulos => {
      const nuevosDatosTitulos = [...prevDatosTitulos];
      nuevosDatosTitulos.pop();
      return nuevosDatosTitulos;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(datosTitulos, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Formación académica</Typography>
      <Toolbar />
      <Typography align='left' fontFamily='serif'>Ingrese todos los títulos registrados en la <Link href="https://www.senescyt.gob.ec/consulta-titulos-web/faces/vista/consulta/consulta.xhtml" target="_blank" rel="noopener noreferrer"> Senescyt</Link> </Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                size="small">
                <InputLabel id="select-nivel">Nivel de instrucción</InputLabel>
                <Select
                  labelId="select-nivel"
                  id="id-select-small"
                  label="Nivel de instrucción"
                  value={nivel_instruccion || ''}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'nivel_instruccion' } })}
                >
                  {nivelInstruccion.map(option => (
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
                id='titulo_obtenido'
                autoComplete='off'
                label='Título obtenido'
                type='text'
                placeholder='Ingrese el título obtenido'
                fullWidth
                name='titulo_obtenido'
                value={titulo_obtenido || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'titulo_obtenido' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='periodos_aprobados'
                autoComplete='off'
                label='Periodos aprobados'
                type='text'
                placeholder='Ingrese los periodos aprobados'
                fullWidth
                name='periodos_aprobados'
                value={periodos_aprobados || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'periodos_aprobados' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='num_registro'
                autoComplete='off'
                label='Número de registro'
                type='text'
                placeholder='Ingrese el número de registro del título'
                fullWidth
                name='num_registro'
                value={num_registro || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'num_registro' } })}
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
                label='Institución de educación superior'
                type='text'
                placeholder='Ingrese el institucion de educación superior'
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
                id='area_conocimiento'
                autoComplete='off'
                label='Area de conocimiento'
                type='text'
                placeholder='Ingrese el área de conocimiento'
                fullWidth
                name='area_conocimiento'
                value={area_conocimiento || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'area_conocimiento' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_registro'
                  label="Fecha de registro"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_registro' } })}
                  value={dayjs(fecha_registro)}
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
                  disabled={formState.periodos_aprobados === ''}
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
                    <TableCell align="center">Nivel de instrucción</TableCell>
                    <TableCell align="center">País </TableCell>
                    <TableCell align="center">Titulo_obtenido</TableCell>
                    <TableCell align="center">Periodos aprobados</TableCell>
                    <TableCell align="center">Intitucion</TableCell>
                    <TableCell align="center">Registro</TableCell>
                    <TableCell align="center">Área de conocimiento</TableCell>
                    <TableCell align="center">Fecha de registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosTitulos.map((titulo, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{titulo.nivel_instruccion}</TableCell>
                      <TableCell align="center">{titulo.pais}</TableCell>
                      <TableCell align="center">{titulo.titulo_obtenido}</TableCell>
                      <TableCell align="center">{titulo.periodos_aprobados}</TableCell>
                      <TableCell align="center">{titulo.institucion}</TableCell>
                      <TableCell align="center">{titulo.num_registro}</TableCell>
                      <TableCell align="center">{titulo.area_conocimiento}</TableCell>
                      <TableCell align="center">{titulo.fecha_registro}</TableCell>
                      
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
