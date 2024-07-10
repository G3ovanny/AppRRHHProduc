import React, { useState } from 'react'
import { useAlertDialogStore, useModalStore, useUsuarioStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, EditOutlined, NoteAddOutlined } from '@mui/icons-material';
import { AlertDialog } from '../../../../ui';

export const TableButtons = () => {

  const { activeUsuario, startSavingUsuario, startDeletingUsuario } = useUsuarioStore();

  const { openModal } = useModalStore();
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Estado para controlar la apertura de la alerta
  const content = '¿Está seguro que quiere eliminar el registro?';

  const numActivos = activeUsuario.length;
  const handleEdit = () => {
    openModal('Editando datos')
  }

  const handleDelete = () => {
    openAlertDialog(content);
    // startDeletingUsuario()
  }
  const handleConfirmation = () => {
    startDeletingUsuario();
    closeAlertDialog();
    setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };
  return (
    <>
      {
        numActivos !== 1 ? (
          <>

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
                <EditOutlined />
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
