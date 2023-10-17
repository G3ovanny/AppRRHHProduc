import { Box, Button, Container, CssBaseline, Divider, Grid, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useForm, useFormularioStore } from '../../../hooks'

const formData = {
    numero_identificacion: '',
    nombres: '',
    numHijos: '',
}

export const FormTrabmasDatos = () => {



    const { startSavingDatos } = useFormularioStore();

    const {
        numero_identificacion,
        nombres,
        numHijos,
        formState,
        onResetForm,
        setFormState,
        onInputChange,
    } = useForm(formData)

    const onSubmit = () => {
        startSavingDatos(formState)
    }
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Toolbar />
                    <Box
                        sx={{ height: '100vh' }}>
                        <form onSubmit={onSubmit}>
                            <Typography align='center'>Datos personales para el registro de talento humano</Typography>
                            <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
                                        <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                            <TextField
                                                //error={numero_identificacionValid !== null}
                                                //helperText={numero_identificacionValid}
                                                sx={{ minWidth: 180 }}
                                                size="small"
                                                id='numero_identificacion'
                                                autoComplete='false'
                                                label='Número identificación'
                                                type='text'
                                                placeholder='Ingrese el numero de identificación del servidor'
                                                fullWidth
                                                name='numero_identificacion'
                                                value={numero_identificacion || ''}
                                                onChange={onInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                            <TextField
                                                //error={ !== null}
                                                //helperText={numero_identificacionValid}
                                                sx={{ minWidth: 180 }}
                                                size="small"
                                                id='Nombres completos'
                                                autoComplete='false'
                                                label='Nombres'
                                                type='text'
                                                placeholder='Ingrese sus nombres completos'
                                                fullWidth
                                                name='nombres'
                                                value={nombres || ''}
                                                onChange={onInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                                            <TextField
                                                //error={ !== null}
                                                //helperText={numero_identificacionValid}
                                                sx={{ minWidth: 180 }}
                                                size="small"
                                                id='hijos'
                                                autoComplete='false'
                                                label='Numero de hijos'
                                                type='number'
                                                placeholder='Ingrese el número de hijos'
                                                fullWidth
                                                name='numHijos'
                                                value={numHijos || ''}
                                                onChange={onInputChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Toolbar />
                            <Divider />
                            <Stack
                                direction='row'
                                spacing={2}
                                sx={{ mt: 2 }}>
                                <Button
                                    variant="outlined"
                                //startIcon={<CancelScheduleSend />}
                                //onClick={handleCancelarEnvio}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant="contained"
                                    //disabled={!isFormValid}
                                    //endIcon={<Send />}
                                    onClick={onSubmit}
                                >
                                    Enviar
                                </Button>
                            </Stack>
                        </form>
                    </Box>

                </Container>
            </React.Fragment>
        </>

    )
}
