import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm } from '../../../../hooks'
import dayjs from 'dayjs'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'

const formData = {
  estudia_actualmente: '',
  anio: '',
  nombre_centro: '',
  especializacion: '',
  horario: '',
  tiempo_termina: '',
}

export const EstudiosActuales = ({selectedTab, onFormSubmit }) => {
  const [estudios, setEstudios] = useState([])
  const {
    estudia_actualmente,
    anio,
    nombre_centro,
    especializacion,
    horario,
    tiempo_termina,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddTitulo = () => {
    setEstudios(prevEstudios => [...prevEstudios, formState]);
    onResetForm()
  };

  const handleDeleteFamiliar = () => {
    setEstudios(prevEstudios => {
      const nuevosEstudios = [...prevEstudios];
      nuevosEstudios.pop();
      return nuevosEstudios;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(estudios, selectedTab);
  };
  
  return (
    <Box>
      <Typography align='center'>Estudios Actuales</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>

        <Grid item xs={12} sm={12} md={12}>

          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >

            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormGroup>
                <FormControlLabel
                  row
                  label="Estudia actualmente"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      checked={estudia_actualmente || false}
                      onChange={e => onInputChange({ target: { value: e.target.checked, name: 'estudia_actualmente' } })}

                    />
                  }
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!estudia_actualmente}
                  views={['year']}
                  id='anio'
                  label="Año"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  value={dayjs(anio)}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'anio' } })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!estudia_actualmente}
                sx={{ minWidth: 180 }}
                size="small"
                id='centro'
                autoComplete='off'
                label='Nombre del centro educativo'
                type='text'
                placeholder='Ingrese el nombres del centro educativo'
                fullWidth
                name='nombre_centro'
                value={nombre_centro || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'nombre_centro' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!estudia_actualmente}
                sx={{ minWidth: 180 }}
                size="small"
                id='especializacion'
                autoComplete='off'
                label='Especialización'
                type='text'
                placeholder='Ingrese la especializacion'
                fullWidth
                name='especializacion'
                value={especializacion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'especializacion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!estudia_actualmente}
                sx={{ minWidth: 180 }}
                size="small"
                id='horario'
                autoComplete='off'
                label='Horario'
                type='text'
                placeholder='Ingrese el horario'
                fullWidth
                name='horario'
                value={horario || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'horario' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!estudia_actualmente}
                sx={{ minWidth: 180 }}
                size="small"
                id='tiempo_termina'
                autoComplete='off'
                label='Tiempo que le falta para terminar'
                type='text'
                placeholder='Ingrese el tiempo que le falta para terminar'
                fullWidth
                name='tiempo_termina'
                value={tiempo_termina || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'tiempo_termina' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  disabled={!tiempo_termina}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddTitulo}
                >
                  Agregar
                </Button>
                <Button
                  disabled={!estudios.length >= 1 }
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
                  <TableCell align="center">Estudia actualmente</TableCell>
                    <TableCell align="center">Año</TableCell>
                    <TableCell align="center">Nombre del centro educativo</TableCell>
                    <TableCell align="center">Especialización</TableCell>
                    <TableCell align="center">Horario</TableCell>
                    <TableCell align="center">Tiempo que le falta para terminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {estudios.map((estudio, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center"><Checkbox  checked ={estudio.estudia_actualmente} /></TableCell>
                      <TableCell align="center">{estudio.anio}</TableCell>
                      <TableCell align="center">{estudio.nombre_centro}</TableCell>
                      <TableCell align="center">{estudio.especializacion}</TableCell>
                      <TableCell align="center">{estudio.horario}</TableCell>
                      <TableCell align="center">{estudio.tiempo_termina}</TableCell>
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
