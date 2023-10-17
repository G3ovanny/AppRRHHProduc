import { useRef, useState } from 'react'
import { BadgeOutlined, PersonAdd, TableViewOutlined, TagTwoTone, UploadFile, UploadOutlined } from '@mui/icons-material'
import { Alert, Box, Divider, Grid, IconButton, Input, Toolbar, Tooltip, Typography } from '@mui/material'
import { Table, Cards, TrabajadorModal, MensajeArchivo } from '../components'
import { useArchivoStore, useModalStore, useTrabStore } from '../../../hooks'

export const Trabajadores = () => {
  const { setActiveTrab, mensaje, mensajesError } = useTrabStore();
  const { startSavingArchivo, mensajeArchivo } = useArchivoStore();
  const { openModal, nameModal } = useModalStore()
  const [vista, setVista] = useState('list')

  const onFileInputChange = async ({ target }) => {
    if (target.files === 0) return;
    const file = target.files[0]
    startSavingArchivo(file)
  }

  const handeleAddTrabajador = () => {
    setActiveTrab('')
    openModal('Nuevo Servidor')
  }
  const handleView = (e, vista) => {
    console.log(vista)
    setVista(vista)
  }

  let alerta = null
  if (mensaje) {
    alerta = <Alert severity='success'>{mensaje}</Alert>;
  } else if (mensajesError) {
    alerta = <Alert severity='error'>{mensajesError}</Alert>;
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
          sx={{ flex: ' 1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Servidores
        </Typography>


        <Tooltip title="Carga multiple" color="secondary" >
          <IconButton >
            <label htmlFor="btnFile" >
              <UploadOutlined />
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

        <Tooltip title="Agregar" color="secondary" >
          <IconButton
            onClick={handeleAddTrabajador}
          >
            <PersonAdd />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Lista" color="secondary" >
          <IconButton
            onClick={e => handleView(e, 'list')}
          >
            <TableViewOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tarjetas" color="secondary">
          <IconButton
            onClick={e => handleView(e, 'cards')}
          >
            <BadgeOutlined />
          </IconButton>
        </Tooltip> */}
      </Toolbar>
      <Divider />
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensaje || !!mensajesError ? '' : 'none'}
        >
          {alerta}
        </Grid>
      </Toolbar>
      {
        vista == 'list'
          ? <Table /> //<TableFilter /> //
          : <Cards />
      }
      {/*<Modales />*/}
      {mensajeArchivo
        ? <MensajeArchivo />
        : <> </>
      }
      <TrabajadorModal titleModal={nameModal} />
    </Box>
  )
}
