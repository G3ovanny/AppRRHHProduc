import React from 'react'
import { useDatosTrabStore, useModalStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, EditOffOutlined, LocalPrintshopOutlined } from '@mui/icons-material';

export const TableButtons = () => {
    const { activeDatos, startDeletingDatosTrab } = useDatosTrabStore();
    const { openModal} = useModalStore();
    const numActivos = activeDatos.length;
    const handleEdit = (event) => {
        event.preventDefault();
    }
    const handleDelete=()=>{
        startDeletingDatosTrab()
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
                <EditOffOutlined />
              </IconButton>
            </Tooltip>
  
          </>
        )}
      </>
    )
}
