import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'

const formData = {
  idioma: '',
  hablar: '',
  escribir: '',
  leer: '',
  traducir: '',
}

export const OtrosIdiomas = ({ selectedTab, onFormSubmit }) => {
  const [idiomas, setIdiomas] = useState([])

  const [value, setValue] = useState('female');
  const {
    idioma,
    hablar,
    escribir,
    leer,
    traducir,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddIdioma = () => {
    setIdiomas(prevIdiomas => [...prevIdiomas, formState]);
    onResetForm()
  };

  const handleDeleteIdioma = () => {
    setIdiomas(prevIdiomas => {
      const nuevasIdiomas = [...prevIdiomas];
      nuevasIdiomas.pop();
      return nuevasIdiomas;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(idiomas, selectedTab);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box>
      <Typography align='center'>Otros idiomas que conoce</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <TextField
                //disabled={!idioma}
                sx={{ minWidth: 180 }}
                size="small"
                id='idioma'
                autoComplete='off'
                label='Idioma'
                type='text'
                placeholder='Ingrese el idioma'
                fullWidth
                name='idioma'
                value={idioma || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'idioma' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
              <Typography align='center'>NIVEL DE CONOCIMIENTO PARA: </Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <FormControl>
                <FormLabel id="hablar">HABLAR</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={hablar}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'hablar' } })}
                >
                  <FormControlLabel value="ALTO" control={<Radio />} label="ALTO" />
                  <FormControlLabel value="MEDIO" control={<Radio />} label="MEDIO" />
                  <FormControlLabel value="BAJO" control={<Radio />} label="BAJO" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <FormControl>
                <FormLabel id="escribir">ESCRIBIR</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={escribir}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'escribir' } })}
                >
                  <FormControlLabel value="ALTO" control={<Radio />} label="ALTO" />
                  <FormControlLabel value="MEDIO" control={<Radio />} label="MEDIO" />
                  <FormControlLabel value="BAJO" control={<Radio />} label="BAJO" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <FormControl>
                <FormLabel id="leer">LEER</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={leer}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'leer' } })}
                >
                  <FormControlLabel value="ALTO" control={<Radio />} label="ALTO" />
                  <FormControlLabel value="MEDIO" control={<Radio />} label="MEDIO" />
                  <FormControlLabel value="BAJO" control={<Radio />} label="BAJO" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <FormControl>
                <FormLabel id="traducir">TIENE CAPACIDAD PARA TRADUCIR</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={traducir}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'traducir' } })}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <Stack
                direction='row'
                spacing={2}
              >
                <Button
                  //disabled={!identificador_bibliografico}
                  variant="contained"
                  endIcon={<AddOutlined />}
                  onClick={handleAddIdioma}
                >
                  Agregar
                </Button>
                <Button
                  //disabled={!institucion.length >= 1}
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeleteIdioma}
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
                    <TableCell align="center">Idioma</TableCell>
                    <TableCell align="center">Hablar</TableCell>
                    <TableCell align="center">Escribir</TableCell>
                    <TableCell align="center">Leer</TableCell>
                    <TableCell align="center">Tiene capacidad para traducir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {idiomas.map((idiom, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{idiom.idioma}</TableCell>
                      <TableCell align="center">{idiom.hablar}</TableCell>
                      <TableCell align="center">{idiom.escribir}</TableCell>
                      <TableCell align="center">{idiom.leer}</TableCell>
                      <TableCell align="center">{idiom.traducir}</TableCell>
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
