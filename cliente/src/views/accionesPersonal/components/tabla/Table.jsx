import { useEffect, useState } from 'react'
import { TableButtons } from './TableButtons'
import { useAccionPersonalStore } from '../../../../hooks'
import { BasicTable } from '../../../../ui/components/tablas';
import { TableCells } from './TableCells';
import { indexCells } from './tableindex';
import { TableFilters } from './TableFilters';
import dayjs from 'dayjs';

export const Table = () => {
  const { listAccion, startLoadingAccion, setActiveAccion, activeAccion } = useAccionPersonalStore();

  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

  const handleBuscar = (valorBuscar, columna, fechaDesde, fechaHasta) => {
    const resultadosFiltrados = listAccion.filter((accion) => {
      //return dayjs(accion.fecha_hora_salida).isBetween(fechaDesde, fechaHasta)
      //se filtra por el tipo de columna y el datos ingresado
      switch (columna) {
        case 'cedulaTrab':
          return accion.numero_identidad.includes(valorBuscar)
        case 'nombresTrab':
          return accion.nombres.toLowerCase().includes(valorBuscar.toLowerCase()) || accion.apellido_paterno.toLowerCase().includes(valorBuscar.toLowerCase()) || accion.apellido_materno.toLowerCase().includes(valorBuscar.toLowerCase())
        case 'tipoAccion':
          return accion.tipo_accion.includes(valorBuscar)
        default:
          return accion.contador == valorBuscar 
      }

    }).filter((accion) => {

      //Filtro por columna, le dato ingresado y fechas
      if (!fechaDesde && !fechaHasta) {
        return accion; // Si no se especifican fechas, se considera dentro del rango
      }
      if (fechaDesde && fechaHasta) {
        return dayjs(accion.fecha_rigue).isBetween(fechaDesde, fechaHasta)
      } else if (fechaDesde) {
        return dayjs(accion.fecha_rigue).isAfter(fechaDesde)
      } else if (fechaHasta) {

        return dayjs(accion.fecha_rigue).isBefore(fechaHasta);
      }

      return accion;
    });
    setResultadoBusqueda(resultadosFiltrados);
  }
  useEffect(() => {
    setResultadoBusqueda()
  }, [])

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
