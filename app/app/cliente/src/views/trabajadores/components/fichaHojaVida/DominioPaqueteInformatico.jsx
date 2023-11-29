import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useForm } from '../../../../hooks'
import { AddOutlined, DeleteOutlineOutlined, SaveAltOutlined } from '@mui/icons-material'
import { useState } from 'react'

const formData = {
  paquete: '',
  manejo: '',

}

export const DominioPaqueteInformatico = ({ selectedTab, onFormSubmit }) => {
  const [paquetes, setpaquetes] = useState([])
  const [value, setValue] = useState('female');
  const {
    paquete,
    manejo,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleAddpaquete = () => {
    setpaquetes(prevpaquetes => [...prevpaquetes, formState]);
    onResetForm()
  };

  const handleDeletepaquete = () => {
    setpaquetes(prevpaquetes => {
      const nuevaspaquetes = [...prevpaquetes];
      nuevaspaquetes.pop();
      return nuevaspaquetes;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(paquetes, selectedTab);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <Typography align='center'>Dominio de paquetes informáticos (Software aplicativo)</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >

            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <TextField
                //disabled={!paquete}
                sx={{ minWidth: 180 }}
                size="small"
                id='paquete'
                autoComplete='off'
                label='Paquete'
                type='text'
                placeholder='Ingrese el paquete'
                fullWidth
                name='paquete'
                value={paquete || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'paquete' } })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
              <Typography align='center'>NIVEL DE CONOCIMIENTO PARA: </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
              <FormControl>
                <FormLabel id="manejo">MANEJO</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={manejo}
                  onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'manejo' } })}
                >
                  <FormControlLabel value="BASICO" control={<Radio />} label="BASICO" />
                  <FormControlLabel value="INTERMEDIO" control={<Radio />} label="INTERMEDIO" />
                  <FormControlLabel value="AVANZADO" control={<Radio />} label="AVANZADO" />
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
                  onClick={handleAddpaquete}
                >
                  Agregar
                </Button>
                <Button
                  //disabled={!institucion.length >= 1}
                  color='error'
                  variant='outlined'
                  endIcon={<DeleteOutlineOutlined />}
                  onClick={handleDeletepaquete}
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
                    <TableCell align="center">Paquete</TableCell>
                    <TableCell align="center">Manejo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paquetes.map((idiom, index) => (
                    <TableRow key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{idiom.paquete}</TableCell>
                      <TableCell align="center">{idiom.manejo}</TableCell>
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
