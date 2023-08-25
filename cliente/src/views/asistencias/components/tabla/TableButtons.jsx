import React from 'react'
import { useAsistenciaStore } from '../../../../hooks'
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

export const TableButtons = () => {

  const { activeAsistencia, startDeletingAsistencia } = useAsistenciaStore();

  const numActivos = activeAsistencia.length;

  const handleDelete = () => {
    startDeletingAsistencia()
  }

  return (
    <div>
      {
        numActivos !== 1 ? (
          <div>
            <Tooltip title='Eliminar' color='error'>
              <IconButton
                component='div'
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip
              component= 'div'
              title='Eliminar' 
              color='error'
            >
              <IconButton
                component='div'
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    </div>
  )
}
