import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'

const formData = {
  dicta_clases: '',
  nombre_centro: '',
  materia_dicta: '',
  horario: '',
}
export const OtrosTrabajosInstitucionales = ({selectedTab, onFormSubmit }) => {
  const [institucion, setInstitucion] = useState([])
  const {
    dicta_clases,
    nombre_centro,
    materia_dicta,
    horario,

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
      <Typography align='center'>Dicta clases actualmente en otra institución</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>

        <Grid item xs={12} sm={12} md={12}>

          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >

            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <FormGroup>
                <FormControlLabel
                  row
                  label=" Dicta clases actualmente"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      checked={dicta_clases || false}
                      onChange={e => onInputChange({ target: { value: e.target.checked, name: 'dicta_clases' } })}

                    />
                  }
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                disabled={!dicta_clases}
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
                disabled={!dicta_clases}
                sx={{ minWidth: 180 }}
                size="small"
                id='materia_dicta'
                autoComplete='off'
                label='Materia que dicta'
                type='text'
                placeholder='Ingrese la materia que dicta'
                fullWidth
                name='materia_dicta'
                value={materia_dicta || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'materia_dicta' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ mt: 1 }}>
              <TextField
                disabled={!dicta_clases}
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
            
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  disabled={!horario}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddInstitucion}
                >
                  Agregar
                </Button>
                <Button
                  disabled={!institucion.length >= 1 }
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
                  <TableCell align="center">Dicta clases actualmente</TableCell>
                    <TableCell align="center">Nombre del centro educativo</TableCell>
                    <TableCell align="center">Materia que dicta</TableCell>
                    <TableCell align="center">Horario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {institucion.map((estudio, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center"><Checkbox  checked ={estudio.dicta_clases} /></TableCell>
                      <TableCell align="center">{estudio.nombre_centro}</TableCell>
                      <TableCell align="center">{estudio.materia_dicta}</TableCell>
                      <TableCell align="center">{estudio.horario}</TableCell>
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
