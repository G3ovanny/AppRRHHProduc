import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const formData = {
  tipo_mensiones: '',
  nombre_institucion: '',
  fecha: '',
}
export const MencionesHonorificas = ({ selectedTab, onFormSubmit }) => {
  const [menciones, setMenciones] = useState([])
  const {
    tipo_mensiones,
    nombre_institucion,
    fecha,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddMencion = () => {
    setMenciones(prevMenciones => [...prevMenciones, formState]);
    onResetForm()
  };

  const handleDeleteMencion = () => {
    setMenciones(prevMenciones => {
      const nuevasMenciones = [...prevMenciones];
      nuevasMenciones.pop();
      return nuevasMenciones;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(menciones, selectedTab);
  };
  return (
    <Box>
      <Typography align='center'>Menciones honórificas, méritos y premios</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
           
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <TextField
                //disabled={!tipo_mensiones}
                sx={{ minWidth: 180 }}
                size="small"
                id='tipo_mensiones'
                autoComplete='off'
                label='Tipo'
                type='text'
                placeholder='Ingrese el tipo'
                fullWidth
                name='tipo_mensiones'
                value={tipo_mensiones || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'tipo_mensiones' } })}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <TextField
                //disabled={!tipo_mensiones}
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

          
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //disabled={!estudia_actualmente}
                  //views={['year']}
                  id='fecha'
                  label="Año de publicación "
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ minWidth: 150 }} size="small"
                  value={dayjs(fecha)}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha' } })}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  //disabled={!identificador_bibliografico}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddMencion}
                >
                  Agregar
                </Button>
                <Button
                  //disabled={!institucion.length >= 1}
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteMencion}
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
                  
                    <TableCell align="center">Año de publicación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menciones.map((mencion, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{mencion.tipo_mensiones}</TableCell>
                      <TableCell align="center">{mencion.nombre_institucion}</TableCell>
                     
                      <TableCell align="center">{mencion.fecha}</TableCell>
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
