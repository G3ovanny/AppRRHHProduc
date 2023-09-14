import React from 'react'
import { useModalStore, useUsuarioStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, EditOutlined, NoteAddOutlined } from '@mui/icons-material';

export const TableButtons = () => {

  const { activeUsuario, startSavingUsuario, startDeletingUsuario } = useUsuarioStore();

  const { openModal } = useModalStore();
  const numActivos = activeUsuario.length;
  const handleEdit = () => {
    openModal('Editando datos')
  }

  const handleDelete = () => {
    startDeletingUsuario()
  }

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
    </>
  )
}
