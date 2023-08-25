import React, { useEffect, useState } from 'react'
import { TableButtons } from './TableButtons'
import { useCronogramaVacacionesStore } from '../../../../hooks'
import { TableCells } from './TableCells';
import { indexCells } from './tableindex';
import { BasicTable } from '../../../../ui/components/tablas';
import { TableFilters } from './TableFilters';
import dayjs from 'dayjs';

export const Table = () => {
    const { listCronograma, startLoadingCronograma, setActiveCronograma, activeCronograma } = useCronogramaVacacionesStore();

    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    const handleBuscar = (valorBuscar, columna, fechaDesde, fechaHasta) => {
        const resultadosFiltrados = listCronograma.filter((cronograma) => {

            switch (columna) {
                case 'cedulaTrab':
                    return cronograma.numero_identificacion.includes(valorBuscar)
                case 'nombresTrab':
                    return cronograma.nombres.toLowerCase().includes(valorBuscar.toLowerCase())
                case 'regLaboral':
                    return cronograma.regimen_laboral.toLowerCase().includes(valorBuscar.toLowerCase())
                default:
                    return cronograma.estado.toLowerCase().includes(valorBuscar.toLowerCase())
            }

        }).filter((cronograma) => {

            //Filtro por columna, le dato ingresado y fechas
            if (!fechaDesde && !fechaHasta) {
                return cronograma; // Si no se especifican fechas, se considera dentro del rango
            }
            if (fechaDesde && fechaHasta) {
                return dayjs(cronograma.fecha_inicio).isBetween(fechaDesde, fechaHasta)
            } else if (fechaDesde) {
                return dayjs(cronograma.fecha_inicio).isAfter(fechaDesde)
            } else if (fechaHasta) {

                return dayjs(cronograma.fecha_inicio).isBefore(fechaHasta);
            }

            return cronograma;
        });
        setResultadoBusqueda(resultadosFiltrados);
    }

    useEffect(() => {
        setResultadoBusqueda()
    }, [])
    const title = 'Lista cronograma'
    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={listCronograma}
                objactive={activeCronograma}
                setObjecActive={setActiveCronograma}
                startLoadingObjects={startLoadingCronograma()}
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
