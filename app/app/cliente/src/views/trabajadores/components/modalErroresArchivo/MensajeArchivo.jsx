import React, { useEffect } from 'react'
import { useArchivoStore } from '../../../../hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'


export const MensajeArchivo = () => {

  const [open, setOpen] = React.useState(false);
  const { mensajeArchivo, onClearMessage } = useArchivoStore()
  const handleClose = () => {
    setOpen(false);
    onClearMessage()
  };
  useEffect(() => {
    if (mensajeArchivo) {
      setOpen(true);
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {'Mensajes al cargar archivo'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {mensajeArchivo.map(mensError => (
            <Typography key={mensError}>
              {mensError}
            </Typography>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose} 
          >
            Aceptar
            </Button>
      </DialogActions>
    </Dialog>
  )
}
