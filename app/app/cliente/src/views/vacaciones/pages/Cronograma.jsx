import { DriveFolderUpload, EditCalendar } from '@mui/icons-material'
import { Alert, Box, Divider, Grid, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useArchivoCronogramaStore, useCronogramaVacacionesStore, useModalStore } from '../../../hooks'
import { CronogramaModal, Table } from '../components'
import { VacacionesModal } from '../components/modal/VacacionesModal'

export const Cronograma = () => {
  const { mensajeCronograma, setActiveCronograma } = useCronogramaVacacionesStore()
  const { openModal, nameModal } = useModalStore();
  const { startSavingArchivoCron, mensajeArchivoCron } = useArchivoCronogramaStore();

  const onFileInputChange = async ({ target }) => {
    if (target.files === 0) return;
    const file = target.files[0]
    startSavingArchivoCron(file)
  }

  const handleAddCronograma = () => {
    setActiveCronograma([])
    openModal('Nuevo Cronograma')
  }

  return (
    <Box>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tittle'
          component='div'
        >
          Cronograma de vacaciones
        </Typography>

        <Tooltip title='Cargar cronograma de vacaciones' color='secondary'>
          <IconButton >
            <label htmlFor="btnFile" >
              <DriveFolderUpload />
            </label>
          </IconButton>
        </Tooltip>
        <input
          id="btnFile"
          style={{ display: "none" }}
          type="file"
          multiple
          onChange={onFileInputChange}
        />

        <Tooltip title="Agregar Cronograma de vacaciones" color="secondary">
          <IconButton
            onClick={handleAddCronograma}
          >
            <EditCalendar
            />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensajeCronograma ? '' : 'none'}
        >
          <Alert severity='success' >{mensajeCronograma}</Alert>

        </Grid>
      </Toolbar>
      {mensajeArchivoCron
        ? <VacacionesModal />
        : <></>
      }

      <Table />
      <CronogramaModal titleModal={nameModal} />
    </Box>
  )
}
