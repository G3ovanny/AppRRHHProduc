import { DeleteOutline, Edit, LocalPrintshopOutlined, ForwardToInboxOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useModalStore, useTrabStore } from '../../../../hooks'
export const TableButtons = () => {
  const { activeTrab, startDeletingTrab, startSendEmailTrab } = useTrabStore();

  const { openModal } = useModalStore();

  const numActivos = activeTrab.length;
  const handleSendEmail = () => {
    startSendEmailTrab()
  }

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
        <>
          <Tooltip title="Enviar correo" color="secondary">
            <IconButton
              component='div'
              disabled={!numActivos}
              onClick={handleSendEmail}
            >
              <ForwardToInboxOutlined />
            </IconButton >
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
            </IconButton >
          </Tooltip>

        </>

      ) : (
        <>
          <Tooltip title="Imprimir" color='secondary'>
            <IconButton
            //onClick={handlePrint}
            >
              <LocalPrintshopOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" color='secondary'>
            <IconButton
              onClick={handleEdit}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Enviar correo" color="secondary">
            <IconButton
              component='div'
              disabled={!numActivos}
              onClick={handleSendEmail}
            >
              <ForwardToInboxOutlined />
            </IconButton >
          </Tooltip>
          <Tooltip title="Eliminar" color="error">
            <IconButton
              onClick={handleDelete}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  )
}
