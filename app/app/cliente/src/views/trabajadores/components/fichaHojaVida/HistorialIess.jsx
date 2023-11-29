import { SaveAltOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Link, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React from 'react'
import { useForm } from '../../../../hooks'

const formData = {
  fecha_ingSectPub: '',
  imposiciones_SectPub: '',
  fecha_ingUpec: '',
  imposiciones_Upec: '',
}

export const HistorialIess = ({ selectedTab, onFormSubmit }) => {
  const {
    fecha_ingSectPub,
    imposiciones_SectPub,
    fecha_ingUpec,
    imposiciones_Upec,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData)

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(formState, selectedTab);
  };
  return (
    <Box>

      <Typography align='center'>Historial del tiempo trabajado por empresa - IESS</Typography>
      <Toolbar />
      <Typography align='left' fontFamily='serif'>Confirme la siguiente información en la página web del <Link href="https://www.iess.gob.ec/afiliado-web/pages/principal.jsf" target="_blank" rel="noopener noreferrer"> IESS</Link> "Tiempo de servicio por empleador"</Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={12} md={10}>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_ingSectPub'
                  label="Fecha de ingreso al sector público"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{
                    minWidth: 200,
                    width: '100%',  // Adjust the width as needed
                    // maxWidth: '100px',  // You can also use maxWidth if needed
                  }}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_ingSectPub' } })}
                  value={dayjs(fecha_ingSectPub)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 200 }}
                size="small"
                id='imposiciones_SectPub'
                autoComplete='off'
                label='Número de imposiciones en el sector público'
                type='text'
                placeholder='Ingrese el número de imposiciones en el sector público'
                fullWidth
                name='imposiciones_SectPub'
                value={imposiciones_SectPub || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'imposiciones_SectPub' } })}
              />
            </Grid>
          </Grid>
          <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={12} md={4} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id='fecha_ingUpec'
                  label="Fecha de primer ingreso a la UPEC"
                  autoComplete='off'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{
                    minWidth: 200,
                    width: '100%',  // Adjust the width as needed
                    // maxWidth: '1200px',  // You can also use maxWidth if needed
                  }}
                  onChange={date => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_ingUpec' } })}
                  value={dayjs(fecha_ingUpec)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
              <TextField
                //error={ !== null}
                //helperText={numero_identificacionValid}
                sx={{ minWidth: 180 }}
                size="small"
                id='imposiciones_Upec'
                autoComplete='off'
                label='Número de imposiciones al IESS en la UPEC'
                type='text'
                placeholder='Ingrese el número de imposiciones al IESS en la UPEC'
                fullWidth
                name='imposiciones_Upec'
                value={imposiciones_Upec || ''}
                onChange={(e) => onInputChange({ target: { value: e.target.value.toUpperCase(), name: 'imposiciones_Upec' } })}
              />
            </Grid>
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
