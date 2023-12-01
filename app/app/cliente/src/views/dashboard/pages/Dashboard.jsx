import React, { useEffect, useState } from 'react'

import { Box, Grid, Toolbar, Typography } from '@mui/material'
import { useAccionPersonalStore, usePermisoStore, useTrabStore } from '../../../hooks';
import { Cards, ChartMasPermisoMes, ChartPermisosMes, ChartTrabModalidad, ChartTrabTRegimen } from '../components';
import dayjs from 'dayjs';

export const Dashboard = () => {

  const { trabajadores, startLoadingTrab } = useTrabStore()
  const { listAccion, startLoadingAccion } = useAccionPersonalStore()
  const { listPermiso, startLoadingPermiso } = usePermisoStore()

  const [permisosAnuales, setPermisosAnuales] = useState([])
  const [accionesAnuales, setAccionesAnuales] = useState([])

  const fechaActual = dayjs().year()

  const filtrarPermisosAnio = () => {
    const datosAnioActual = listPermiso.filter(permiso => dayjs(permiso.created_date).year() === fechaActual);
    setPermisosAnuales(datosAnioActual)
  }
  const filtrarAccionesAnio = () => {
    const datosAnioActual = listAccion.filter(accion => dayjs(accion.created_date).year() === fechaActual);
    setAccionesAnuales(datosAnioActual)
  }

  const [contServidor, setContServidor] = useState(0)
  const [contAcciones, setContAcciones] = useState(0)
  const [contPermisos, setContPermisos] = useState(0)

  const startCounting = (setState, data, intervalDependency) => {
    const interval = setInterval(() => {
      setState(prevCounter => {
        const elementosRestantes = data.length - prevCounter;

        let incremento = 1;
        if (elementosRestantes > 1000) incremento = 100;
        else if (elementosRestantes > 100) incremento = 10;
        else if (elementosRestantes > 10) incremento = 2;

        if (prevCounter < data.length) {
          return prevCounter + incremento;
        } else {
          clearInterval(interval);
          return prevCounter;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    startLoadingTrab();
    startLoadingPermiso();
    startLoadingAccion();
  }, []);

  useEffect(() => {
    filtrarPermisosAnio();
    filtrarAccionesAnio();
  }, [listPermiso, listAccion]);
  
  useEffect(() => startCounting(setContServidor, trabajadores, trabajadores), [trabajadores]);
  useEffect(() => startCounting(setContAcciones, accionesAnuales, accionesAnuales), [accionesAnuales]);
  useEffect(() => startCounting(setContPermisos, permisosAnuales, permisosAnuales), [permisosAnuales]);



  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Cards
            titulo={'Servidores activos'}
            children={
              <>
                <Toolbar />
                <Typography variant='h3' align='center'>
                  {contServidor}
                </Typography>
                <Typography variant='h6' align='center'>
                  Total servidores registrados
                </Typography>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cards
            titulo={'Permisos solicitados'}
            children={
              <>
                <Toolbar />
                <Typography variant='h3' align='center'>
                  {contPermisos}
                </Typography>
                <Typography variant='h6' align='center'>
                  Total permisos registrados anual
                </Typography>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cards
            titulo={'Acciones de personal'}
            children={
              <>
                <Toolbar />
                <Typography variant='h3' align='center'>
                  {contAcciones}
                </Typography>
                <Typography variant='h6' align='center'>
                  Total acciones de personal anual
                </Typography>
              </>
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Cards
            titulo={'Servidores por régimen laboral'}
            children={<ChartTrabTRegimen />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Cards
            titulo={"Servidores por modalidad laboral"}
            children={<ChartTrabModalidad />}
          />
        </Grid>
        <Grid item xs={12} md={6}>


          <Cards
            titulo={'Permisos por mes'}
            children={<ChartPermisosMes />}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <Cards
            titulo={'Servidores con mas permisos'}
            children={<ChartMasPermisoMes />}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
