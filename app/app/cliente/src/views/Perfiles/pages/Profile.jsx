import { Avatar, Badge, Box, Button, Divider, Grid, Paper, Stack, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useModalStore, useUsuarioStore } from '../../../hooks';
import { PasswordModal, PerfilModal } from '../components/modal';
import { Add, AddPhotoAlternate, Folder } from '@mui/icons-material';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  // width: '150px',
  // height: '150px',
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: '150px',
  height: '150px',
  //border: `2px solid ${theme.palette.background.paper}`,
}));

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
    openModal('Editando datos')
  }

  const handlePass = () => {
    openModal('Cambio de contraseña')
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
              <Grid item xs={12} sm={12} md={8}  >
                <Item>
                  <Toolbar sx={{
                    backgroundColor: 'ButtonFace',
                  }}>
                    Mis datos
                  </Toolbar>
                  <Grid item container xs={12} sm={12} md={12} sx={{ mt: 1 }}  >
                    <Grid item container spacing={12}>

                      <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        //marginTop: '25px',
                        marginBottom: '25px'
                      }}>

                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <SmallAvatar alt="asd" src="/static/images/avatar/1.jpg" >
                              <Add/>
                            </SmallAvatar>
                          }
                        >
                          <LargeAvatar alt={usuario} src="" />
                          {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
                        </Badge>
                        {/* <LargeAvatar alt={usuario} src="" /> */}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ backgroundColor: 'ButtonFace' }}>
                      <Grid container alignItems="center" item xs={12} md={6}>

                        <Grid item xs={12} sm={12} md={12} >
                          <Typography variant="h6" color="initial">Nombre de usuario:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ mt: { xs: 0, sm: 0, md: 0 }, marginBottom: { xs: 0, sm: 0, md: 0 } }}>
                          <Typography variant="h7" color="initial">{user.nombre} {user.apellido_paterno}</Typography>
                        </Grid>
                      </Grid>

                      <Grid container alignItems="center" item xs={12} md={6}>

                        <Grid item xs={12} sm={12} md={12} >
                          <Typography variant="h6" color="initial">Usuario:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ mt: { xs: 0, sm: 0, md: 0 }, marginBottom: { xs: 0, sm: 0, md: 0 } }}>
                          <Typography variant="h7" color="initial">{user.username}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center" item xs={12} md={6}>

                        <Grid item xs={12} sm={12} md={12} >
                          <Typography variant="h6" color="initial">Correo electrónico:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ mt: { xs: 0, sm: 0, md: 0 }, marginBottom: { xs: 0, sm: 0, md: 0 } }}>
                          <Typography variant="h7" color="initial">{user.correo}</Typography>
                        </Grid>
                      </Grid>

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
            {
              nameModal === 'Editando datos'
                ? <PerfilModal titleModal={nameModal} user={user} />
                : <PasswordModal titleModal={nameModal} user={user} />
            }
          </Box>
        )
      }
    </>

  )
}
