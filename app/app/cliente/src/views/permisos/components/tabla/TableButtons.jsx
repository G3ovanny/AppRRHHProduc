import React, { useState } from 'react'
import { useAlertDialogStore, useModalStore, usePermisoStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, Download } from '@mui/icons-material';
import { DocExcel } from '../documentoExcel';
import { AlertDialog } from '../../../../ui';


export const TableButtons = () => {
  const { activePermiso, startDeletingPermiso } = usePermisoStore();
  const { openModal } = useModalStore();
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Estado para controlar la apertura de la alerta
  const content = '¿Está seguro que quiere eliminar el registro?';

  const numActivos = activePermiso.length;

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos')
  }
  const handleDelete = () => {
    openAlertDialog(content);
    //startDeletingPermiso()
  }
  const handleConfirmation = () => {
    startDeletingPermiso();
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };
  const handlePrint = () => {
    DocExcel(activePermiso)
  }

  return (
    <>
      {
        numActivos !== 1 ? (
          <>
            <Tooltip title="Exportar a excel" color='secondary'>
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handlePrint}
              >
                <Download />
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Eliminar"
              color="error"
            >
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Exportar a excel" color='secondary'>
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handlePrint}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="ELiminar" color="error">
              <IconButton
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" color='secondary'>
              <IconButton
                onClick={handleEdit}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        )}
      <AlertDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleConfirmation}
        title="Confirmar Eliminación"
        content={content}
      />
    </>
  )
}
