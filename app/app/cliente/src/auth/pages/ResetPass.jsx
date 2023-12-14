import React, { useEffect } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Grid, TextField } from '@mui/material'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'
import { useResetPass } from '../../hooks/auth/useResetPass'


const resetPass = {
    usuario: '',
}
export const ResetPass = () => {
    const { usuario, onInputChange, onResetForm } = useForm(resetPass)
    const { startCheckUser, mensajeResetPass, isCheckingUser } = useResetPass()
    const [loading, setLoading] = React.useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        startCheckUser(usuario)
        onResetForm()
    }

    useEffect(() => {
        setLoading(isCheckingUser)
    }, [isCheckingUser])


    return (
        <AuthLayout title={'Restaurar contraseña'}>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Usuario'
                            type='text'
                            placeholder='usuario'
                            fullWidth
                            name='usuario'
                            value={usuario}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                        <Grid
                            item
                            xs={12}
                            //display={true}
                            display={!!mensajeResetPass ? '' : 'none'}
                        >
                            <Alert severity='info' >{mensajeResetPass}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <LoadingButton
                                size="small"
                                //onClick={handleClick}
                                loading={true}
                                variant="outlined"
                                disabled
                            >
                                <span>disabled</span>
                            </LoadingButton> */}
                            <LoadingButton
                                type='submit'
                                variant='outlined'
                                fullWidth
                                loading={loading}
                                //loadingIndicator="Loading…"
                                onClick={onSubmit}
                            >
                                Enviar
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link to="/">
                                <LoadingButton
                                    variant="contained"
                                    loading={loading}
                                    fullWidth>
                                    Iniciar sesión
                                </LoadingButton>
                            </Link>
                        </Grid>

                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
