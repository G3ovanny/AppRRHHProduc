import { useDispatch, useSelector } from 'react-redux'
import { onCloseAlertDialog, onOpenAlertDialog } from '../../store'

export const useAlertDialogStore = () => {
  const dispatch = useDispatch()
  const { isAlertDialogOpen } = useSelector(state => state.alertDialog)

  const openAlertDialog = () => {
    dispatch(onOpenAlertDialog());
  }

  const closeAlertDialog = () => {
    dispatch(onCloseAlertDialog())

  }

  return {
    //* Propiedades
    isAlertDialogOpen,
    //* Metodos
    openAlertDialog,
    closeAlertDialog,

  }
}