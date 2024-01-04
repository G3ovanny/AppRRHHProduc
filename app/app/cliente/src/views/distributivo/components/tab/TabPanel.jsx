import React from 'react'
import { BaseTab } from '../../../../ui'
import { Box, Tab, Tabs } from '@mui/material'
import { DominacionPuesto, ModalidadLaboral, NivelOcupacional, RegimenLaboral, UnidadOrganica, EstructuraProgramatica, Procesos } from '../../pages';

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
                    <Tab component='div' label='Régimen laboral' {...a11yProps(0)} />
                    <Tab label='Nivel ocupacional' {...a11yProps(1)} />
                    <Tab label='Modalidad laboral' {...a11yProps(2)} />
                    <Tab label='Proceso' {...a11yProps(3)} />
                    <Tab label='Unidad orgánica' {...a11yProps(4)} />
                    <Tab label='Denominación puesto' {...a11yProps(5)} />
                    <Tab label='Estructura programática' {...a11yProps(6)} />
                </Tabs>
            </Box>
            <Box component='div'>
                <BaseTab component='div' value={value} index={0} > <RegimenLaboral /> </BaseTab>
                <BaseTab value={value} index={1} > <NivelOcupacional /> </BaseTab>
                <BaseTab value={value} index={2} > <ModalidadLaboral /> </BaseTab>
                <BaseTab value={value} index={3} > <Procesos /> </BaseTab>
                <BaseTab value={value} index={4} > <UnidadOrganica /> </BaseTab>
                <BaseTab value={value} index={5} > <DominacionPuesto /> </BaseTab>
                <BaseTab value={value} index={6} > <EstructuraProgramatica /> </BaseTab>
            </Box>
        </Box>
    )
}
