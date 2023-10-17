import React from 'react'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useAuthStore, useForm } from '../../hooks'

const loginFormFields = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const { startLoging, errorMessage } = useAuthStore();

    const { username, password, onInputChange } = useForm(loginFormFields)

    const onSubmit = (event) => {
        event.preventDefault();
        startLoging({ username, password })

    }
    return (
        <AuthLayout title={'Inicio de sesión'}>
            <form onSubmit={onsubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Usuario'
                            type='text'
                            placeholder='usuario'
                            fullWidth
                            name='username'
                            value={username}
                            onChange={onInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                        <Grid
                            item
                            xs={12}
                            //display={true}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error' >{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                onClick={onSubmit}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained'
                                fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
