import { Box, Button, Divider, FormControl, Grid, InputLabel, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'

const formData = {
  apellidos: '',
  nombres: '',
  relacion: '',
  direccion: '',
  telefono: '',
}
export const ContactoEmergencia = ({ selectedTab, onFormSubmit }) => {
  const [datosContacto, setDatosContacto] = useState([])

  const {
    apellidos,
    nombres,
    relacion,
    direccion,
    telefono,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)
  //Guardo los deatos de cada hijo en un arreglo

  const handleAddContacto = () => {
    setDatosContacto(prevDatosContacto => [...prevDatosContacto, formState]);
    onResetForm()
  };

  const handleDeleteContacto = () => {
    setDatosContacto(prevDatosContacto => {
      const nuevosDatosContacto = [...prevDatosContacto];
      nuevosDatosContacto.pop();
      return nuevosDatosContacto;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(datosContacto, selectedTab);
  };
  return (
    <Box>

      <Typography align='center'>Personas que la Universidad podría contactar en caso de emergencia</Typography>
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
                placeholder='Ingrese los apellidos del contacto'
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
                placeholder='Ingrese los nombres del contacto'
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
                id='relacion'
                autoComplete='off'
                label='Relación de parentesco o amistad'
                type='text'
                placeholder='Ingrese la relación o parentesco del contacto'
                fullWidth
                name='relacion'
                value={relacion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'relacion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='direccion'
                autoComplete='off'
                label='Dirección'
                type='text'
                placeholder='Ingrese la direccion del contacto'
                fullWidth
                name='direccion'
                value={direccion || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'direccion' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='telefono'
                autoComplete='off'
                label='Teléfono'
                type='text'
                placeholder='Ingrese la telefono del contacto'
                fullWidth
                name='telefono'
                value={telefono || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'telefono' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              //sx={{ mt: 2, mb: 2 }}
              >
                <Button
                  disabled={formState.nombres === ''}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddContacto}
                >
                  Agregar
                </Button>
                <Button
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteContacto}
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
                    <TableCell align="center">Apellidos </TableCell>
                    <TableCell align="center">Nombres</TableCell>
                    <TableCell align="center">Relacion de parentesco o amistad</TableCell>
                    <TableCell align="center">Dirección</TableCell>
                    <TableCell align="center">Teléfono</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosContacto.map((contacto, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{contacto.apellidos}</TableCell>
                      <TableCell align="center">{contacto.nombres}</TableCell>
                      <TableCell align="center">{contacto.relacion}</TableCell>
                      <TableCell align="center">{contacto.direccion}</TableCell>
                      <TableCell align="center">{contacto.telefono}</TableCell>
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
