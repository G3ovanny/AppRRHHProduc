import React, { useEffect, useState } from 'react'
import { useAuthStore, useForm, useModalStore, useUsuarioStore } from '../../../../hooks'
import { BaseModal } from '../../../../ui'
import Typography from '@mui/material/Typography'
import { Alert, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Toolbar } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Visibility, VisibilityOff } from '@mui/icons-material'


const formData = {
  old_password: '',
  password: '',
  password2: '',
}

export const PasswordModal = ({ titleModal, user }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { startChangePassUsuario, mensajeUsuario, mensajeErrorUsuario } = useUsuarioStore()
  const { closeModal } = useModalStore()
  const [messagePasswords, setMessagePassword] = useState('');
  const [caracteres, setCaracteres] = useState(false)
  const [passIguales, setPassIguales] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState('')
  const { startLogout } = useAuthStore()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '70%' : '35%',
    height: isSmallScreen ? '60%' : '55%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const formValidations = {
    old_password: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    password: [
      (value) => {
        const isLengthValid = value.length >= 8
        setCaracteres(isLengthValid)
        return isLengthValid;
      },
      'La contraseña debe tener al menos 8 caracteres'
    ],
    password2: [
      (value) => {
        const isLengthValid = value.length >= 8 && value === password
        setPassIguales(isLengthValid)
        return isLengthValid;
      },
      'las contraseñas no cinciden o no tienen al menos 8 caracteres'
    ],
  }
  const {
    old_password,
    password,
    password2,
    old_passwordValid,
    passwordValid,
    password2Valid,
    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData, formValidations)

  const onSubmit = async () => {

    await startChangePassUsuario(formState)
    await cerrarSesion(formState.password2)
  }

  const handleCancelarEnvio = () => {
    onResetForm()
    closeModal()
  }

  const cerrarSesion = async (pass2) => {

    if (pass2) {
      await startLogout(); // Llama a tu función de cierre de sesión
      window.location.reload();
    }
    // if (userNameOld !== userNameNew) {
    //   // Si ha cambiado, intenta cerrar la sesión
    // }
  }


  const verificarCoincidencia = () => {
    if (password2) {
      if (password === password2) {
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


  useEffect(() => {
    if (user && setFormState) {
      // // Actualizar el estado del formulario con los datos del usuario
      setFormState(prevState => ({
        ...prevState,
        id: user.id,
        groups: user.groups,
      }));
    }
  }, [user, setFormState]);

  useEffect(() => {
    if (formState) {
      if (formState.password2) {
        const alerta = 'Si la contraseña se cambia deberá volver a iniciar sesión'
        setMensaje(alerta)
      }
    }
  }, [formState.password2])


  useEffect(() => {
    if (mensajeErrorUsuario !== null) {
      const erorPass = <Alert severity="error">{mensajeErrorUsuario}</Alert>
      setMessagePassword(erorPass)
    }
  }, [mensajeErrorUsuario])

  return (
    <BaseModal
      title={titleModal}
      style={style}
    >
      <Box>
        <form
          onSubmit={onSubmit}
        >
          {mensaje && (
            <Grid>
              <Alert severity="warning">{mensaje}</Alert>
            </Grid>
          )}
          <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="old_password">Contraseña actual</InputLabel>
                  <OutlinedInput
                    error={old_passwordValid}
                    id="old_password"
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
                    label='Contraseña actual'
                    placeholder='Ingrese la contraseña actual'
                    fullWidth
                    name='old_password'
                    value={old_password}
                    onChange={onInputChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="password">Nueva contraseña</InputLabel>
                  <OutlinedInput
                    error={passwordValid}
                    id="password"
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
                    label='Nueva contraseña'
                    placeholder='Ingrese una nueva contraseña'
                    fullWidth
                    name='password'
                    value={password}
                    onChange={onInputChange}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="password2">Repita la contraseña</InputLabel>
                  <OutlinedInput
                    error={password2Valid}
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
                    label='Repita la constraseña'
                    placeholder='Ingrese nuevamente la contraseña'
                    fullWidth
                    name='password2'
                    value={password2}
                    onChange={onInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <FormGroup>
            <FormControlLabel disabled size="small" control={<Checkbox checked={caracteres} />} label="La contraseña debe tener más de 8 caracteres" />
            <FormControlLabel disabled control={<Checkbox checked={passIguales} />} label="Las contraseñas deben ser iguales" />
            {/* <FormControlLabel required control={<Checkbox />} label="Required" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
          </FormGroup>
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
          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancelarEnvio}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              disabled={!isFormValid}
              onClick={onSubmit}
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </Box>
    </BaseModal >
  )
}