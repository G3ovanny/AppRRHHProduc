import { Alert, Avatar, Box, Button, Divider, Grid, IconButton, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { useModalStore, useUsuarioStore } from '../../../hooks';
import { UsuarioModal } from '../../usuarios/components/modal';

const LargeAvatar = styled(Avatar)({
  width: '150px',
  height: '150px',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Profile = () => {
  const { isLoadingUsuario, listUsuario, startLoadingUsuario } = useUsuarioStore()
  const usuario = localStorage.getItem('username')
  const { openModal, nameModal } = useModalStore()


  const filterUser = () => {
    return listUsuario.find(u => u.username === usuario)

  }
  const user = filterUser();

  if (usuario) {
    startLoadingUsuario()
    filterUser()
  }

  const handleEdit = () => {
    openModal('Editando mis datos')
  }

  const handlePass = () => {
    openModal('Cambiar mi contraseña')
  }

  return (
    <>
      {
        isLoadingUsuario ? (
          <div></div>
        ) : (
          <Box>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Typography
                sx={{ flex: ' 1 1 100%' }}
                variant='h6'
                id='tableTitle'
                component='div'
              >
                Mi perfil
              </Typography>
            </Toolbar>
            <Divider />
            <Toolbar />

            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }} >
              <Grid item xs={12} sm={12} md={6}  >
                <Item>
                  <Toolbar sx={{
                    backgroundColor: 'ButtonFace',
                  }}>
                    Mis datos
                  </Toolbar>
                  <Grid container xs={12} sm={12} md={12} sx={{ mt: 1 }}  >
                    <Grid container spacing={12}>
                      <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        marginTop: '25px',
                        marginBottom: '25px'
                      }}>

                        {/* Usar el Avatar con el tamaño personalizado */}
                        <LargeAvatar alt={usuario} src="" />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                      <Typography variant="h6" color="initial">Nombre </Typography>
                      <Typography variant="h7" color="initial">{user.nombre}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                      <Typography variant="h6" color="initial">
                        Apellido paterno</Typography>
                      <Typography variant="h7" color="initial"> {user.apellido_paterno}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                      <Typography variant="h6" color="initial">Usuario</Typography>
                      <Typography variant="h7" color="initial">{user.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ mt: 1 }}>
                      <Typography variant="h6" color="initial">Correo electrónico</Typography>
                      <Typography variant="h7" color="initial">{user.correo}</Typography>
                    </Grid>
                  </Grid>

                  <Stack
                    direction='row'
                    spacing={2}
                    sx={{ mt: 2, justifyContent: 'center' }}>
                    <Button
                      variant='contained'
                      onClick={handleEdit}
                    >
                      Editar mis datos
                    </Button>
                    <Button
                      variant='contained'
                      onClick={handlePass}
                    >
                      Cambiar mi contraseña
                    </Button>
                  </Stack>
                </Item>
              </Grid>
            </Grid>
            {/* <UsuarioModal titleModal={nameModal} /> */}
          </Box>
        )
      }
    </>

  )
}
