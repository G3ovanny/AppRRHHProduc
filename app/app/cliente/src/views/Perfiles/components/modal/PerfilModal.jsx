import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore, useForm, useModalStore, useUsuarioStore } from '../../../../hooks'
import { BaseModal } from '../../../../ui'
import Typography from '@mui/material/Typography'
import { Alert, Box, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const formData = {
  username: '',
  nombre: '',
  apellido_paterno: '',
  correo: '',
}
export const PerfilModal = ({ titleModal, user }) => {

  // const { listUsuario, startLoadingUsuario } = useUsuarioStore()
  // const usuario = localStorage.getItem('username')
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { closeModal } = useModalStore()
  const { startLogout } = useAuthStore()
  const { startSavingUsuario } = useUsuarioStore()
  const [mensaje, setMensaje] = useState('')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '80%' : '60%',
    height: isSmallScreen ? '60%' : '40%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const formValidations = {
    username: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    nombre: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    apellido_paterno: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
    correo: [
      (value) => (value && value.includes('@')),
      'El campo tiene que ser un correo valido'
    ],
  }

  const {
    username,
    nombre,
    apellido_paterno,
    correo,

    nombreValid,
    usernameValid,
    apellido_paternoValid,
    correoValid,

    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData, formValidations)

  const handleCancelarEnvio = () => {
    closeModal()
  }

  const cerrarSesion = async (userNameOld, userNameNew) => {
    if (userNameOld !== userNameNew) {
      // Si ha cambiado, intenta cerrar la sesión
      await startLogout(); // Llama a tu función de cierre de sesión
      window.location.reload();
    }
  }

  const onSubmit = async () => {
    if (user) {

      // Guarda los cambios del usuario
      await startSavingUsuario(formState);
      await cerrarSesion(user.username !== formState.username);

      closeModal();
    }
  };


  useEffect(() => {
    if (user && setFormState) {
      // // Actualizar el estado del formulario con los datos del usuario
      setFormState(prevState => ({
        ...prevState,
        id: user.id,
        groups: user.groups,
        username: user.username,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        correo: user.correo,
        // // Otros campos del formulario según corresponda
      }));
    }
  }, [user, setFormState]);

  useEffect(() => {
    if (user && formState) {
      if (user.username !== formState.username) {
        const alerta = 'Si el campo "Usuario" se cambia deberá iniciar sesión otra vez con el nuevo usuario asignado'
        setMensaje(alerta)
        //cerrarSesion(user.username, formState.username);
      }
    }
  }, [formState.username])


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
            <Typography>Datos del usuario</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  error={nombreValid !== null}
                  autoComplete='false'
                  id="nombre"
                  type='text'
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  fullWidth
                  name='nombre'
                  value={nombre}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  error={apellido_paternoValid !== null}
                  id="apellido_paterno"
                  type='text'
                  label="Apellido paterno"
                  placeholder="Ingrese su aperllido paterno"
                  fullWidth
                  name='apellido_paterno'
                  value={apellido_paterno || ''}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  error={correoValid !== null}
                  id="correo"
                  type='email'
                  label="Correo electrónico"
                  placeholder="Ingrese un correo electrónico personal"
                  fullWidth
                  name='correo'
                  value={correo || ''}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  error={usernameValid !== null}
                  id="username"
                  type='text'
                  label="Usuario"
                  placeholder="Ingrese un nombre de usuario"
                  fullWidth
                  name='username'
                  value={username || ''}
                  onChange={onInputChange}
                />
              </Grid>

            </Grid>
          </Grid>

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
              disabled={isFormValid}
              onClick={onSubmit}
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </Box>
    </BaseModal>
  )
}
