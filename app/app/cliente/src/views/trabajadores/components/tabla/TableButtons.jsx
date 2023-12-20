import { DeleteOutline, Edit, LocalPrintshopOutlined, ForwardToInboxOutlined, Download } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useModalStore, useTrabStore } from '../../../../hooks'
import { DocExcel } from '../documentoExcel'
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
  const handlePrint = () => {
    DocExcel(activeTrab)
  }
  return (
    <>
      {numActivos !== 1 ? (
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
          <Tooltip title="Exportar a excel" color='secondary'>
            <IconButton
              component='div'
              disabled={!numActivos}
              onClick={handlePrint}
            >
              <Download />
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
