import React from 'react'
import { useModalStore, usePermisoStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, LocalPrintshopOutlined } from '@mui/icons-material';

export const TableButtons = () => {
  const { activePermiso, startDeletingPermiso } = usePermisoStore();

  const { openModal } = useModalStore();

  const numActivos = activePermiso.length;

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos')
  }

  const handleDelete = () => {
    startDeletingPermiso()
  }
  return (
    <>
      {
        numActivos !== 1 ? (
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
        ) : (
          <>
            <Tooltip title="Imprimir" color='secondary'>
              <IconButton>
                <LocalPrintshopOutlined />
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
    </>
  )
}
