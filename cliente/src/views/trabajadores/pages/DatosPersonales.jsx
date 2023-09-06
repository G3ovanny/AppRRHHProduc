import { Alert, Box, Divider, Grid, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDatosTrabStore } from '../../../hooks'

export const DatosPersonales = () => {

    const { startLoadingDatosTrab, datosTrab } = useDatosTrabStore()

    startLoadingDatosTrab()

    console.log(datosTrab)

    return (
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
                    Datos personales servidores
                </Typography>

                {/* <Tooltip title="Agregar" color="secondary" >
          <IconButton
            onClick={handeleAddTrabajador}
          >
            <PersonAdd />
          </IconButton>
        </Tooltip> */}

            </Toolbar>
            <Divider />
            <Toolbar>
                {/* <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensaje ? '' : 'none'}
        >
          <Alert severity='success' >{mensaje}</Alert>
        </Grid> */}
            </Toolbar>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {datosTrab.map((value) => (
                    <ListItem
                        key={value}
                        disableGutters
                    >
                        <ListItemText primary={`Número de hijos ${value.numHijos}`} />
                    </ListItem>
                ))}
            </List>
            {/* {
        vista == 'list'
          ? <Table /> //<TableFilter /> //
          : <Cards />
      } */}
            {/*<Modal />*/}
        </Box>
    )
}
