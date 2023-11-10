import { Box, Button, Container, CssBaseline, Divider, Grid, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { useCedulaStore, useForm, useFormularioStore } from '../../../hooks'
import { onUnlinkedingCed } from '../../../store/auth/cedulaSlice'
import { TabPanel } from '../components'
import { StepPanel } from '../components/steps'
import { useState } from 'react'
import { LogoutOutlined, NavigateBeforeOutlined, NavigateNextOutlined, SaveOutlined } from '@mui/icons-material'


export const FormTrabmasDatos = () => {
    const servidor = localStorage.getItem('numero_identificacion')
    const [selectedTab, setSelectedTab] = useState(0);
    const { startSavingDatos } = useFormularioStore();
    const { onunlinkeding } = useCedulaStore();

    const [formularios, setFormularios] = useState()

    const handleCancelSend = () => {
        onunlinkeding()
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

    const handleFormSubmit = (formData) => {
        setFormularios((prevFormularios) => {
            const newFormularios = [prevFormularios];
            newFormularios[selectedTab] = formData;
            return newFormularios;
        });
    };
    const enviarTodosLosDatos = () => {
        // Aquí puedes acceder a todos los datos en 'formularios' y enviarlos juntos.
        console.log("Todos los datos:", formularios);
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
                    <TabPanel
                        key={selectedTab}
                        selectedTab={selectedTab}
                        onFormSubmit={handleFormSubmit} />
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}>
                        <Button
                            color='error'
                            variant="outlined"
                            endIcon={<LogoutOutlined />}
                            onClick={handleCancelSend}
                        >
                            Salir sin guardar
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<NavigateBeforeOutlined />}
                            onClick={handlePreviousTab} // Botón para retroceder a la pestaña anterior
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<NavigateNextOutlined />}
                            onClick={handleNextTab} // Botón para avanzar a la siguiente pestaña
                        >
                            Siguiente
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<SaveOutlined />}
                            onClick={enviarTodosLosDatos} // Botón para avanzar a la siguiente pestaña
                        >
                            Enviar todo los datos
                        </Button>
                    </Stack>
                </Box>
            </Container >
        </Box >
    )
}
