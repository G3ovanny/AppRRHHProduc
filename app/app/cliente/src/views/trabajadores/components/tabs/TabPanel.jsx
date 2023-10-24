import React from 'react'
import { BaseTab } from '../../../../ui'
import { Box, Tab, Tabs } from '@mui/material'
import { Capacitaciones, 
    ContactoEmergencia, 
    DireccionPermanente, 
    DominioPaqueteInformatico, 
    EstudiosActuales, 
    ExperienciaLaboral, 
    FormacionAcademica, 
    HistorialIess, 
    InformacionBancaria, 
    InformacionConyuge, 
    InformacionFamiliares, 
    InformacionHijos, 
    InformacionPersonal, 
    MencionesHonorificas, 
    OtrosIdiomas, 
    OtrosTrabajosInstitucionales, 
    Publicaciones } from '../fichaHojaVida';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabPanel = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box
            component='div'
            sx={{ width: '100%' }}>
            <Box
                component='div'
                sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    component='div'
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="basic tabs example">
                    <Tab component='div' label='iNFORMACIÓN PERSONAL' {...a11yProps(0)} />
                    <Tab component='div' label='INFORMACION BANCARIA' {...a11yProps(1)} />
                    <Tab component='div' label='DIRECCIÓN PERMANENTE' {...a11yProps(2)} />
                    <Tab component='div' label='CÓNYUGE Y/O COMPAÑERO' {...a11yProps(3)} />
                    <Tab component='div' label='INFORMACIÓN DE HIJOS' {...a11yProps(4)} />
                    <Tab component='div' label='INFORMACIÓN FAMILIARES EN LA INSTITUCIÓN' {...a11yProps(5)} />
                    <Tab component='div' label='HISTORIAL DEL TIEMPO DE TRABAJO POR EMPRESA -IESS' {...a11yProps(6)} />
                    <Tab component='div' label='CONTACTO DE EMERGENCIA' {...a11yProps(7)} />
                    <Tab component='div' label='FORMACIÓN ACADÉMICA' {...a11yProps(8)} />
                    <Tab component='div' label='EVENTOS DE CAPACITACIÓN' {...a11yProps(9)} />
                    <Tab component='div' label='ESTUDIOS ACTUALES' {...a11yProps(10)} />
                    <Tab component='div' label='TRABAJA EN OTRA INSTITUCIÓN' {...a11yProps(11)} />
                    <Tab component='div' label='PUBLICACIONES' {...a11yProps(12)} />
                    <Tab component='div' label='MENCIONES HONORÍFICAS, MÉRITOS Y PREMIOS' {...a11yProps(14)} />
                    <Tab component='div' label='OTROS IDIOMAS' {...a11yProps(14)} />
                    <Tab component='div' label='DOMINIO DE PAQUETES INFORMÁTICOS' {...a11yProps(14)} />
                    <Tab component='div' label='EXPERIENCIA LABORAL' {...a11yProps(14)} />
                </Tabs>
            </Box>
            <Box component='div'>
                <BaseTab component='div' value={value} index={0} > <InformacionPersonal /> </BaseTab>
                <BaseTab component='div' value={value} index={1} > <InformacionBancaria /> </BaseTab>
                <BaseTab component='div' value={value} index={2} > <DireccionPermanente /> </BaseTab>
                <BaseTab component='div' value={value} index={3} > <InformacionConyuge /> </BaseTab>
                <BaseTab component='div' value={value} index={4} > <InformacionHijos /> </BaseTab>
                <BaseTab component='div' value={value} index={5} > <InformacionFamiliares /> </BaseTab>
                <BaseTab component='div' value={value} index={6} > <HistorialIess /> </BaseTab>
                <BaseTab component='div' value={value} index={7} > <ContactoEmergencia /> </BaseTab>
                <BaseTab component='div' value={value} index={8} > <FormacionAcademica /> </BaseTab>
                <BaseTab component='div' value={value} index={9} > <Capacitaciones /> </BaseTab>
                <BaseTab component='div' value={value} index={10} > <EstudiosActuales /> </BaseTab>
                <BaseTab component='div' value={value} index={11} > <OtrosTrabajosInstitucionales /> </BaseTab>
                <BaseTab component='div' value={value} index={12} > <Publicaciones /> </BaseTab>
                <BaseTab component='div' value={value} index={13} > <MencionesHonorificas /> </BaseTab>
                <BaseTab component='div' value={value} index={14} > <OtrosIdiomas /> </BaseTab>
                <BaseTab component='div' value={value} index={15} > <DominioPaqueteInformatico /> </BaseTab>
                <BaseTab component='div' value={value} index={16} > <ExperienciaLaboral /> </BaseTab>
            </Box>
        </Box>
    )
}
