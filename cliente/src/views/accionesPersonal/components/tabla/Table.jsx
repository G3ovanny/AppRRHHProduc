import React from 'react'
import { TableButtons } from './TableButtons'
import { useAccionPersonalStore } from '../../../../hooks'
import { BasicTable } from '../../../../ui/components/tablas';
import { TableCells } from './TableCells';
import { indexCells } from './tableindex';

export const Table = () => {
  const { listAccion, startLoadingAccion, setActiveAccion, activeAccion } = useAccionPersonalStore();

  const title = 'Lista acciones de personal'
  return (
    <div
      style={{ height: 500, width: '100%' }}
    >

      <BasicTable
        title={title}
        objetos={listAccion}
        objactive={activeAccion}
        setObjecActive={setActiveAccion}
        startLoadingObjects={startLoadingAccion()}
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
    </div>
  )
}
