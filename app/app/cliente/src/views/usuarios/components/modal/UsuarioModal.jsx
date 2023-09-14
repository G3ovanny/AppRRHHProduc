import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useForm, useModalStore, useUsuarioStore } from "../../../../hooks"
import { BaseModal } from "../../../../ui"
import { FormPassword } from "./FormPassword"
import { useEffect, useState } from "react"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '65%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 6,
}

const formData = {
  username: '',
  nombre: '',
  apellido_paterno: '',
  correo: '',
  is_staff: true,
}
export const UsuarioModal = ({ titleModal }) => {
  const { closeModal } = useModalStore();
  const { activeUsuario, startSavingUsuario } = useUsuarioStore();
  const [validationsPass, setValidationsPass] = useState(false)
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
    is_staff: [
      (value) => !!value,
      'El campo es obligatorio'
    ],
  }
  const {
    username,
    nombre,
    apellido_paterno,
    correo,
    is_staff,
    onInputChange,
    isFormValid,
    formState,
    onResetForm,
    setFormState,
  } = useForm(formData, formValidations)

  let addUsuario = false
  if (titleModal == 'Nuevo Usuario') {
    if (isFormValid && validationsPass) {
      addUsuario = true
    } else {
      addUsuario = false
    }
  } else {
    if (isFormValid) {
      addUsuario = true
    } else {
      addUsuario = false
    }
  }

  //asigno valores de las contraseñas en el formulario
  const passwords = (passwords) => {
    formState.password = passwords.pass2
  }

  const passValidators = (passValidators) => {
    setValidationsPass(passValidators)
  }

  const onSubmit = () => {
    if (addUsuario) {
      startSavingUsuario(formState)
      closeModal()
      onResetForm()
    } else {
      console.log('Error en el formulario')
    }
  }
  const handleCancelarEnvio = () => {
    closeModal()
    onResetForm()
  }

  useEffect(() => {
    if (activeUsuario !== null) {
      setFormState({ ...activeUsuario[0] })
    }
  }, [activeUsuario])
  return (
    <BaseModal
      title={titleModal}
      style={style}
    >
      <Box>
        <form onSubmit={onSubmit}>
          <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            <Typography>Datos del usuario</Typography>
            <Grid item container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <TextField sx={{ minWidth: 180 }} size="small"
                  autoComplete='false'
                  id="nombre"
                  type='text'
                  label="Nombre"
                  placeholder="Ingrese el nombre del usuario"
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
                  placeholder="Ingrese el apellido paterno del usuario"
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
                  placeholder="Ingrese el correo electrónico del usuario"
                  //defaultValue={trabajador.dias_vacaciones}
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
                  placeholder="Ingrese el usuario del usuario"
                  //defaultValue={trabajador.dias_vacaciones}
                  fullWidth
                  name='username'
                  value={username || ''}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ mt: 2 }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Estado</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="estado"
                    value={is_staff}
                    onChange={e => onInputChange({ target: { value: e.target.value, name: 'is_staff' } })}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Activo" sx={{ color: 'error' }} />
                    <FormControlLabel value={false} control={<Radio />} label="Inactivo" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {
            titleModal == 'Nuevo Usuario'
              ? <FormPassword passwords={passwords} passValidators={passValidators} />
              : <></>
          }

          <Divider />
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
              disabled={!addUsuario}
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
