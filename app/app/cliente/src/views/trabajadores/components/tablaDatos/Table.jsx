import React, { useState } from 'react'
import { useDatosTrabStore } from '../../../../hooks'
import { TableButtons, TableCells, TableFilters, indexCells } from './'
import { BasicTable } from '../../../../ui/components/tablas'

export const Table = () => {
  const { datosTrab, startLoadingDatosTrab, setActiveDatosTrab, activeDatos, isLoadingDatos } = useDatosTrabStore()
  const [resultadoBusqueda, setResultadoBusqueda] = useState('')

  const title = 'Datos personales'
  const handleBuscar = (valorBuscar, columna) => {
    const resultadosFiltrados = datosTrab.filter((datos)=>{

    })
  }

  return (
    <div
    style={{ height: 500, width: '100%' }}
>
    <BasicTable
        title={title}
        objetos={datosTrab}
        objactive={activeDatos}
        setObjecActive={setActiveDatosTrab}
        isLoadingObjects={isLoadingDatos}
        startLoadingObjects={startLoadingDatosTrab()}
        tableCells={<TableCells list={resultadoBusqueda} />}
        indexCells={indexCells}
        tableButtons={<TableButtons />}
        filters={<TableFilters onBuscar={handleBuscar} />}
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
