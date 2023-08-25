import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui'
import { useAsistenciaStore } from '../../../../hooks'
import { TableCells } from './TableCells';
import { TableButtons } from './TableButtons';
import { indexCells } from './tableindex';
import { Box } from '@mui/material';
import { TableFilters } from './TableFilters';

export const Table = ({ title }) => {
  const { listAsistencia, startLoadingAsistencia, setActiveAsistencia, activeAsistencia } = useAsistenciaStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

  const handleBuscar = (valorBuscar, columna, fechaDesde, fechaHasta) => {
    const resultadosFiltrados = listAsistencia.filter((asistencia) => {
      //return dayjs(asistencia.hora).isBetween(fechaDesde, fechaHasta)
      //se filt
      //'regLaboral',
      //'estado',
      switch (columna) {
        case 'cedulaTrab':
          return asistencia.numero_identificacion.includes(valorBuscar)
        case 'nombresTrab':
          return asistencia.nombres.toLowerCase().includes(valorBuscar.toLowerCase())
        case 'regLaboral':
          return asistencia.regimen_laboral.toLowerCase().includes(valorBuscar.toLowerCase())
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

  useEffect(() => {
    setResultadoBusqueda()
  }, [])
  return (
    <BasicTable
      title={title}
      objetos={listAsistencia}
      objactive={activeAsistencia}
      setObjecActive={setActiveAsistencia}
      startLoadingObjects={startLoadingAsistencia()}
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
  )
}
