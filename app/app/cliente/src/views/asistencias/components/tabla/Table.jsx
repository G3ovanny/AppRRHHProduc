import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui'
import { useAsistenciaStore } from '../../../../hooks'
import { TableCells } from './TableCells';
import { TableButtons } from './TableButtons';
import { indexCells } from './tableindex';
import { TableFilters } from './TableFilters';
import dayjs from 'dayjs';

export const Table = ({ title }) => {
  const { listAsistencia, startLoadingAsistencia, setActiveAsistencia, activeAsistencia, isLoadingAsistencia } = useAsistenciaStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

  const handleBuscar = (valorBuscar, columna, fechaDesde, fechaHasta) => {
    const resultadosFiltrados = listAsistencia.filter((asistencia) => {
      switch (columna) {
        case 'cedulaTrab':
          return asistencia.numero_identificacion.includes(valorBuscar)
        case 'nombresTrab':
          return asistencia.nombres.toLowerCase().includes(valorBuscar.toLowerCase())
        case 'regLaboral':
          return asistencia.regimen_laboral.toLowerCase().includes(valorBuscar.toLowerCase())
        case 'edificio':
          return asistencia.edificio.toLowerCase().includes(valorBuscar.toLowerCase())
        default:
          return asistencia.estado.toLowerCase().includes(valorBuscar.toLowerCase())
      }

    }).filter((asistencia) => {

      //Filtro por columna, le dato ingresado y fechas
      if (!fechaDesde && !fechaHasta) {
        return asistencia; // Si no se especifican fechas, se considera dentro del rango
      }
      if (fechaDesde && fechaHasta) {
        return dayjs(asistencia.hora).isBetween(fechaDesde, fechaHasta)
      } else if (fechaDesde) {
        return dayjs(asistencia.hora).isAfter(fechaDesde)
      } else if (fechaHasta) {

        return dayjs(asistencia.hora).isBefore(fechaHasta);
      }

      return asistencia;
    });
    setResultadoBusqueda(resultadosFiltrados);
  }

  const handleBuscarBase = (valorBuscar, columna, fechaDesde, fechaHasta) => {
    console.log('desde base ',valorBuscar, columna, fechaDesde, fechaHasta)
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  const page = 0
  const pageSize = 100
  const rowsPerPage = 0

  return (
    <BasicTable
      title={title}
      objetos={listAsistencia}
      objactive={activeAsistencia}
      setObjecActive={setActiveAsistencia}
      isLoadingObjects={isLoadingAsistencia}
      startLoadingObjects={startLoadingAsistencia()}
      tableCells={<TableCells list={resultadoBusqueda} page={page} rowsPerPage={rowsPerPage} />}
      indexCells={indexCells}
      tableButtons={<TableButtons />}
      filters={<TableFilters onBuscar={handleBuscar} onBuscarBase={handleBuscarBase} />}
      initialState={{
        pagination: {
          paginationModel: { page, pageSize },
        },
      }}
      pageSizeOptions={[100, 500, 1000]}
    />
  )
}
