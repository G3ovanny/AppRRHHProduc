import React from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { Link } from 'react-router-dom';
import { useCedulaStore, useForm } from '../../hooks'
import { Alert, Button, Grid, TextField } from '@mui/material'


const enlaceFormFields = {
    cedula: '',
}

export const EnlaceDatosTrab = () => {
    const { startLinkeding, errorMessageCed } = useCedulaStore();
    const { cedula, onInputChange } = useForm(enlaceFormFields)
    //const errorMessageCed = 'desde alerta'
    const onSubmit = (event) => {
        event.preventDefault();
        startLinkeding(cedula)
    }
    return (
        <AuthLayout title={'Ingrese su número de cédula'}>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Cédula'
                            type='text'
                            placeholder='cedula'
                            fullWidth
                            name='cedula'
                            value={cedula}
                            onChange={onInputChange}

                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                        <Grid
                            item
                            xs={12}
                            //display={true}
                            display={!!errorMessageCed ? '' : 'none'}
                        >
                            <Alert severity='error' >{errorMessageCed}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='outlined'
                                fullWidth
                                onClick={onSubmit}
                            >
                                Enviar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link to="/">
                                <Button variant="contained" fullWidth>
                                    Ir a Iniciar Sesión
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
