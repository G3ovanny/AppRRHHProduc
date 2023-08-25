import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { usePermisoStore } from '../../../../hooks'
import { indexCells } from './tableindex';
import { TableButtons } from './TableButtons';
import { TableCells } from './TableCells';
import { TableFilters } from './TableFilters';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'


export const Table = () => {

    const { listPermiso, startLoadingPermiso, setActivePermiso, activePermiso } = usePermisoStore();

    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    const handleBuscar = (valorBuscar, columna, fechaDesde, fechaHasta) => {
        const resultadosFiltrados = listPermiso.filter((permiso) => {
            //return dayjs(permiso.fecha_hora_salida).isBetween(fechaDesde, fechaHasta)
            //se filtra por el tipo de columna y el datos ingresado
            switch (columna) {
                case 'cedulaTrab':
                    return permiso.numero_identificacion.includes(valorBuscar)
                case 'nombresTrab':
                    return permiso.nombres.toLowerCase().includes(valorBuscar.toLowerCase())
                default:
                    return permiso.motivo.toLowerCase().includes(valorBuscar.toLowerCase())
            }

        }).filter((permiso) => {

          //Filtro por columna, le dato ingresado y fechas
            if (!fechaDesde && !fechaHasta) {
                return permiso; // Si no se especifican fechas, se considera dentro del rango
            }
            if (fechaDesde && fechaHasta) {
                return dayjs(permiso.fecha_hora_salida).isBetween(fechaDesde, fechaHasta)
            } else if (fechaDesde) {
                return dayjs(permiso.fecha_hora_salida).isAfter(fechaDesde)
            } else if (fechaHasta) {
               
                return dayjs(permiso.fecha_hora_salida).isBefore(fechaHasta);
            }

            return permiso;
        });
        setResultadoBusqueda(resultadosFiltrados);
    }
    const title = 'Lista de permisos'

    useEffect(() => {
        setResultadoBusqueda()
    }, [])


    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={listPermiso}
                objactive={activePermiso}
                setObjecActive={setActivePermiso}
                startLoadingObjects={startLoadingPermiso()}
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
