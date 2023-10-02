import React from 'react'
import { useModalStore, usePermisoStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, Edit, Download } from '@mui/icons-material';
import { DocExcel } from '../documentoExcel';


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
    </>
  )
}
