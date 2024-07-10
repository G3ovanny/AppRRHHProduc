import { useRef, useState } from 'react'
import { BadgeOutlined, CloudUpload, PersonAdd, TableViewOutlined, TagTwoTone, UploadFile, UploadOutlined } from '@mui/icons-material'
import { Alert, Box, Divider, Grid, IconButton, Input, Toolbar, Tooltip, Typography, FormControl, FormLabel, FormHelperText, InputLabel, Select, MenuItem, Button, Menu } from '@mui/material'
import { Table, Cards, TrabajadorModal, MensajeArchivo } from '../components'
import { useArchivoStore, useModalStore, useTrabStore } from '../../../hooks'
import { AlertDialog } from '../../../ui'

const tipos_archivos = [
  { value: 'DISTRIBUTIVO', text: 'DISTRIBUTIVO' },
  { value: 'CORREOS', text: 'CORREOS ELECTRONICOS' },
  { value: 'DIASVACACIONES', text: 'DIAS DE VACACIONES' },
]

export const Trabajadores = () => {
  const { setActiveTrab, mensaje, mensajesError } = useTrabStore();
  const { startSavingArchivo, mensajeArchivo } = useArchivoStore();
  const { openModal, nameModal } = useModalStore()
  const [vista, setVista] = useState('list')

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileTypeSelect = (fileType) => {
    setSelectedFileType(fileType);
    handleMenuClose();

    // Abre el navegador de archivos al seleccionar un tipo de archivo
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Llama a la función de manejo con el archivo y el tipo de archivo seleccionado
      handleFileAndTypeUpload(file, fileType);
    });
  };

  const handleFileAndTypeUpload = (file, fileType) => {

    if (file === 0) return;
    startSavingArchivo(file, fileType);
  };



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

        <Tooltip title="Gargar archivos" color="secondary" >
          <>
            <IconButton
              color="primary"
              onClick={handleMenuOpen}
            >
              <CloudUpload />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleFileTypeSelect("distributivo")}>
                Distributivo
              </MenuItem>
              <MenuItem onClick={() => handleFileTypeSelect("correos")}>
                Correos electrónicos
              </MenuItem>
              <MenuItem onClick={() => handleFileTypeSelect("vacaciones")}>
                Dias de vacaciones
              </MenuItem>

            </Menu></>
        </Tooltip>

        <Tooltip title="Agregar" color="secondary" >
          <IconButton
            onClick={handeleAddTrabajador}
          >
            <PersonAdd />
          </IconButton>
        </Tooltip>

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
