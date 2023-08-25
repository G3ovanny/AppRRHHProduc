import React from 'react'
import { BasicTable } from '../../../../ui'
import { useAsistenciaStore } from '../../../../hooks'
import { TableCells } from './TableCells';
import { TableButtons } from './TableButtons';
import { indexCells } from './tableindex';
import { Box } from '@mui/material';

export const Table = ({ title }) => {
  const { listAsistencia, startLoadingAsistencia, setActiveAsistencia, activeAsistencia } = useAsistenciaStore();
  return (
    <BasicTable
      title={title}
      objetos={listAsistencia}
      objactive={activeAsistencia}
      setObjecActive={setActiveAsistencia}
      startLoadingObjects={startLoadingAsistencia()}
      tableCells={<TableCells />}
      indexCells={indexCells}
      tableButtons={<TableButtons />}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 9 },
        },
      }}
      pageSizeOptions={[9, 10]}
    />
  )
}
