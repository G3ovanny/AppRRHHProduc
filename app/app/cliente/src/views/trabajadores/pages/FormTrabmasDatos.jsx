import { Box, Button, Container, CssBaseline, Divider, Grid, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { useCedulaStore, useForm, useFormularioStore } from '../../../hooks'
import { onUnlinkedingCed } from '../../../store/auth/cedulaSlice'
import { TabPanel } from '../components'
import { StepPanel } from '../components/steps'
import { useState } from 'react'


export const FormTrabmasDatos = () => {
    const servidor = localStorage.getItem('numero_identificacion')
    const [selectedTab, setSelectedTab] = useState(0);
    const { startSavingDatos } = useFormularioStore();
    const { onunlinkeding } = useCedulaStore();


    const handleCancelSend = () => {
        onunlinkeding()
    }

    const onSubmit = () => {
        console.log('submit')
        //startSavingDatos(formState)
    }
    const handleNextTab = () => {
        if (selectedTab < 16) {
            setSelectedTab(selectedTab + 1);
        }
    };

    const handlePreviousTab = () => {
        if (selectedTab > 0) {
            setSelectedTab(selectedTab - 1);
        }
    };
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
                    <TabPanel selectedTab = {selectedTab}/>
                    <Toolbar  />
                    <Divider />
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            //startIcon={<CancelScheduleSend />}
                            onClick={handleCancelSend}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            //disabled={!isFormValid}
                            //endIcon={<Send />}
                            onClick={onSubmit}
                        >
                            Guardar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handlePreviousTab} // Botón para retroceder a la pestaña anterior
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNextTab} // Botón para avanzar a la siguiente pestaña
                        >
                            Siguiente
                        </Button>
                    </Stack>
                </Box>
            </Container >
        </Box >
    )
}
