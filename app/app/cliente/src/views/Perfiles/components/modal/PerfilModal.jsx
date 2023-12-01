import React, { useEffect } from 'react'
import { useForm, useUsuarioStore } from '../../../../hooks'
import { BaseModal } from '../../../../ui'
import Typography from '@mui/material/Typography'
import { Box, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const formData = {
  username: '',
  nombre: '',
  apellido_paterno: '',
  correo: '',
}
export const PerfilModal = ({ titleModal }) => {
  // const { listUsuario, startLoadingUsuario } = useUsuarioStore()
  // const usuario = localStorage.getItem('username')
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: isSmallScreen ? '80%' : '60%',
  //   height: isSmallScreen ? '50%' : '35%',
  //   overflow: 'auto',
  //   bgcolor: 'background.paper',
  //   boxShadow: 24,
  //   pt: 2,
  //   px: 4,
  //   pb: 3,
  // };
  // const formValidations = {
  //   username: [
  //     (value) => !!value,
  //     'El campo es obligatorio'
  //   ],
  //   nombre: [
  //     (value) => !!value,
  //     'El campo es obligatorio'
  //   ],
  //   apellido_paterno: [
  //     (value) => !!value,
  //     'El campo es obligatorio'
  //   ],
  //   correo: [
  //     (value) => (value && value.includes('@')),
  //     'El campo tiene que ser un correo valido'
  //   ],
  // }
  // const {
  //   username,
  //   nombre,
  //   apellido_paterno,
  //   correo,

  //   onInputChange,
  //   isFormValid,
  //   formState,
  //   onResetForm,
  //   setFormState,
  // } = useForm(formData, formValidations)

  // const filterUser = () => {
  //   return listUsuario.find(u => u.username === usuario)
  // }
  // const user = filterUser();

  // const onSubmit = () => {
  //   if (user) {
  //     console.log(formState)
  //   }
  // }

  // if (usuario) {
  //   startLoadingUsuario()
  //   filterUser()
  // }

  // useEffect(() => {
  //   if (user !== null) {
  //     // Actualizar el estado del formulario con los datos del usuario
  //     setFormState(prevState => ({
  //       ...prevState,
  //       username: user.username,
  //       nombre: user.nombre,
  //       apellido_paterno: user.apellido_paterno,
  //       correo: user.correo,
  //       // Otros campos del formulario según corresponda
  //     }));
  //   }
  // }, [user, setFormState]);

  return (
    <BaseModal
      title={titleModal}
      // style={style}
    >
      {/* <Box>
        <form onSubmit={onSubmit}
        >
          <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            <Typography>Datos del usuario</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
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
            // onClick={handleCancelarEnvio}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              // disabled={!addUsuario}
              onClick={onSubmit}
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </Box> */}
    </BaseModal>
  )
}
