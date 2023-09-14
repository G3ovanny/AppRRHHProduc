import { DeleteOutline, Edit, LocalPrintshopOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useModalStore, useTrabStore } from '../../../../hooks'

export const TableButtons = () => {
  const { activeTrab, startDeletingTrab } = useTrabStore();

  const { openModal } = useModalStore();

  const numActivos = activeTrab.length;

  const handleEdit = (event) => {
    event.preventDefault();
    openModal('Editando datos')
  }

  const handleDelete = () => {
    startDeletingTrab()
  }
  return (
    <>
      {numActivos !== 1 ? (
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
          </IconButton >
        </Tooltip>

      ) : (
        <>
          <Tooltip title="Imprimir" color='secondary'>
            <IconButton
            //onClick={handlePrint}
            >
              <LocalPrintshopOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" color="error">
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
