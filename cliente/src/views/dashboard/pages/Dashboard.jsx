import React, { useEffect } from 'react'

import { Box, Button, Grid, List, Paper, Toolbar, Typography } from '@mui/material'
import { useAuthStore, useTrabStore } from '../../../hooks';
import { Cards, ChartAtrasosoMes, ChartMasPermisoMes, ChartPermisosMes, ChartTrabModalidad, ChartTrabTRegimen } from '../components';
import { Group } from '@mui/icons-material';

export const Dashboard = () => {

  const { startLoging, startLogout, errorMessage } = useAuthStore();

  const { trabajadores, startLoadingTrab } = useTrabStore()

  useEffect(() => {
    startLoadingTrab()

  }, [])


  return (
    <Box>
      <Grid container spacing={2}>
        {/* Columna 1 */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={12}>
              <Cards
                titulo={'Servidores activos'}
                children={
                  <>
                    <Toolbar />
                    <Typography variant='h3' align='center'>
                      {trabajadores.length}
                    </Typography>
                    <Typography variant='h6' align='center'>
                      Total servidores registrados
                    </Typography>
                  </>
                }
              />
            </Grid>
            {/* Fila 2 */}
            <Grid item xs={12}>
              <Cards
                titulo={'Servidores por régimen laboral'}
                children={<ChartTrabTRegimen />}
              />
            </Grid>
            {/* Fila 3 */}
            <Grid item xs={12}>
              {/* <Cards /> */}
            </Grid>
          </Grid>
        </Grid>

        {/* Columna 2 */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={12}>
              <Cards
                titulo={'Permisos por mes'}
                children={<ChartPermisosMes />}
              />
            </Grid>
            {/* Fila 2 */}
            <Grid item xs={12}>
              <Cards
                titulo={'Servidores con mas permisos'}
                children={<ChartMasPermisoMes />}
              />
            </Grid>
            {/* Fila 3 */}
            <Grid item xs={12}>
              {/* <Cards /> */}
            </Grid>
          </Grid>
        </Grid>

        {/* Columna 3 */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={12}>
              <Cards
                titulo={"Servidores por modalidad laboral"}
                children={<ChartTrabModalidad />}
              />
            </Grid>
            {/* Fila 2 */}
            <Grid item xs={12}>
              {/* <Cards /> */}
            </Grid>
            {/* Fila 3 */}
            <Grid item xs={12}>
              {/* <Cards /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
