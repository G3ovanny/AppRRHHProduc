import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../hooks'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const formData = {
    password1: '',
    password2: '',
}

export const FormPassword = ({ passwords, passValidators }) => {

    const [messagePasswords, setMessagePassword] = useState('');
    const [caracteres, setCaracteres] = useState(false)
    const [passIguales, setPassIguales] = useState(false)

    const formValidations = {
        password1: [
            (value) => {
                if (value.length >= 8) {
                    setCaracteres(true)
                } else {
                    setCaracteres(false)
                }
            }
        ],
        password2: [
            (value) => {
                if (value.length >= 8) {
                    if (password1 === password2) {
                        setPassIguales(true)
                    } else {
                        setPassIguales(false)
                    }
                } else {
                    setPassIguales(false)
                }
            }
        ],
    }

    const {
        password1,
        password2,
        onInputChange,
    } = useForm(formData, formValidations)

    const contrass = {
        'pass1': password1,
        'pass2': password2
    }
    passwords(contrass)
    passValidators(passIguales)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const verificarCoincidencia = () => {
        if (password2) {
            if (password1 === password2) {
                const message = <Alert severity='success' >Las contraseñas son iguales</Alert>
                setMessagePassword(message)
            } else {
                const message = <Alert severity="error">Las contraseñas no son iguales!</Alert>
                setMessagePassword(message)
            }
            setTimeout(() => {
                setMessagePassword('')
            }, 3000);
        }
    }
    useEffect(() => {
        verificarCoincidencia()
    }, [password2])

    return (
        <>
            <FormGroup>
                <FormControlLabel disabled size="small" control={<Checkbox checked={caracteres} />} label="La contraseña debe tener más de 8 caracteres" />
                <FormControlLabel disabled control={<Checkbox checked={passIguales} />} label="Las contraseñas deben ser iguales" />
                {/* <FormControlLabel required control={<Checkbox />} label="Required" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
            </FormGroup>
            <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Typography>Asignación de contraseña</Typography>
                <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                        <FormControl sx={{ minWidth: 180 }} size="small">
                            <InputLabel htmlFor="password1">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password1"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Contraseña'
                                placeholder='Asigne una contraseña'
                                fullWidth
                                name='password1'
                                value={password1}
                                onChange={onInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                        <FormControl sx={{ minWidth: 180 }} size="small">
                            <InputLabel htmlFor="password2">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password2"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Contraseña'
                                placeholder='Vuelva a escribir la contraseña ingresada'
                                fullWidth
                                name='password2'
                                value={password2}
                                onChange={onInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Toolbar>
                <Grid
                    className='animate__animated animate__backInRight'
                    item
                    sx={{ flex: ' 1 1 100%' }}
                    display={!!messagePasswords ? '' : 'none'}
                >
                    {messagePasswords}
                </Grid>
            </Toolbar>
        </>
    )
}
