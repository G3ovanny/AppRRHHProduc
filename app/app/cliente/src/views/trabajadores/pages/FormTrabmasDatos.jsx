import { Box, Button, Container, CssBaseline, Divider, Grid, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { useCedulaStore, useForm, useFormularioStore } from '../../../hooks'
import { onUnlinkedingCed } from '../../../store/auth/cedulaSlice'
import { TabPanel } from '../components'
import { StepPanel } from '../components/steps'

const formData = {
    numero_identificacion: '',
    nombres: '',
    numHijos: '',
}

export const FormTrabmasDatos = () => {

    const { onunlinkeding } = useCedulaStore()
    const handleCancelarEnvio = () => {
        onunlinkeding()
    }

    const { startSavingDatos } = useFormularioStore();

    const {
        numero_identificacion,
        nombres,
        numHijos,
        formState,
        onResetForm,
        setFormState,
        onInputChange,
    } = useForm(formData)

    const onSubmit = () => {
        console.log(formState)
        //startSavingDatos(formState)
    }
    return (
        <Box>
            <CssBaseline />
            <Container fixed>
                <Toolbar />
                <Box
                    sx={{ height: '100vh' }}
                >
                    <Typography align='center'>DATOS PERSONALES PARA EL REGISTRO EN TALENTO HUMANO</Typography>
                    {/* <StepPanel /> */}
                    <TabPanel />
                    <Toolbar />
                    <Divider />
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            //startIcon={<CancelScheduleSend />}
                            onClick={handleCancelarEnvio}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            //disabled={!isFormValid}
                            //endIcon={<Send />}
                            onClick={onSubmit}
                        >
                            Enviar
                        </Button>
                    </Stack>
                </Box>
            </Container >
        </Box >
    )
}
