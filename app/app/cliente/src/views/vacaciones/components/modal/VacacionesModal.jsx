import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useArchivoCronogramaStore, useCronogramaVacacionesStore } from '../../../../hooks'

export const VacacionesModal = () => {

    const [open, setOpen] = useState(false)
    const { mensajeArchivoCron, clearMessageArchivoCron } = useArchivoCronogramaStore()
    const { startLoadingCronograma } = useCronogramaVacacionesStore()
    const handleClose = () => {
        startLoadingCronograma()
        setOpen(false)
        clearMessageArchivoCron()
    };

    useEffect(() => {
        if (mensajeArchivoCron) {
            setOpen(true)
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
                    {mensajeArchivoCron.map(mensError => (
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
