import { useState } from 'react';
import { BaseTab } from '../../../../ui'
import { Box, Tab, Table, Tabs } from '@mui/material'
import { EdAdminstrativo, EdAulas1, EdAulas2, EdAulas3, EdAulas4 } from '../../pages'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export const TabPanel = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box>
            <Box
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs
                    component='div'
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="basic tabs example">
                    <Tab label='Edificio Administrativo' {...a11yProps(0)} />
                    <Tab label='Edificio Aulas 1' {...a11yProps(1)} />
                    <Tab label='Edificio Aulas 2' {...a11yProps(2)} />
                    <Tab label='Edificio Aulas 3' {...a11yProps(3)} />
                    <Tab label='Edificio Aulas 4' {...a11yProps(4)} />
                </Tabs>
            </Box>

            <Box>
                <BaseTab value={value} index={0} componet='div'> <EdAdminstrativo /> </BaseTab>
                <BaseTab value={value} index={1} componet='div'> <EdAulas1 /> </BaseTab>
                <BaseTab value={value} index={2} componet='div'> <EdAulas2 /> </BaseTab>
                <BaseTab value={value} index={3} componet='div'> <EdAulas3 /> </BaseTab>
                <BaseTab value={value} index={4} componet='div'> <EdAulas4 /> </BaseTab>
            </Box>
        </Box>
    )
}
