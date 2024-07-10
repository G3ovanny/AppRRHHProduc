import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useAlertDialogStore } from '../../../../hooks'


export const AlertDialog = (props) => {
    const {  title, content, onConfirm } = props;
    const { isAlertDialogOpen, closeAlertDialog } = useAlertDialogStore();
    
    const handleClose = () => {
        closeAlertDialog();
    };

    const handleConfirmation =() => {
        onConfirm()
        closeAlertDialog();
    }
    return (
        <Dialog
            open={isAlertDialogOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleConfirmation} autoFocus color='error'>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
