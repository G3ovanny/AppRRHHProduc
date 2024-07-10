import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { usePermisoStore } from '../../../../hooks'
import { indexCells } from './tableindex';
import { TableButtons } from './TableButtons';
import { TableCells } from './TableCells';
import { TableFilters } from './TableFilters';
import dayjs from 'dayjs'


export const Table = () => {

    const { listPermiso, startLoadingPermiso, setActivePermiso, activePermiso, isLoadingPermiso } = usePermisoStore();

    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    const handleBuscar = (valorBuscar, columna, fechaRegistro, fechaDesde, fechaHasta,) => {

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

            // //Filtro por columna, le dato ingresado y fechas

            if (!fechaDesde && !fechaHasta && !fechaRegistro) {
                return permiso; // Si no se especifican fechas, se considera dentro del rango
            }

            if (fechaDesde && fechaHasta) {
                return dayjs(permiso.fecha_hora_salida).isBetween(fechaDesde, fechaHasta)
            } else if (fechaDesde) {
                return dayjs(permiso.fecha_hora_salida).isAfter(fechaDesde, 'day')
            } else if (fechaHasta) {
                return dayjs(permiso.fecha_hora_salida).isBefore(fechaHasta, 'day');
            }
            if (fechaRegistro) {
                return dayjs(permiso.created_date).isSame(fechaRegistro, 'day')
            }
            return permiso;
        });
        setResultadoBusqueda(resultadosFiltrados);
    }

    const title = 'Lista de permisos'

    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    const page = 0
    const pageSize = 10
    const rowsPerPage = 0
    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={listPermiso}
                objactive={activePermiso}
                setObjecActive={setActivePermiso}
                isLoadingObjects={isLoadingPermiso}
                startLoadingObjects={startLoadingPermiso()}
                tableCells={<TableCells list={resultadoBusqueda} page={page} rowsPerPage={rowsPerPage} />}
                indexCells={indexCells}
                tableButtons={<TableButtons />}
                filters={<TableFilters onBuscar={handleBuscar} />}
                initialState={{
                    pagination: {
                        paginationModel: { page, pageSize },
                    },
                }}
                pageSizeOptions={[10, 25, 100]}
            />

        </div>
    )
}
