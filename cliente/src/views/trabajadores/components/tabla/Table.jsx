import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { TableCells, TableButtons, indexCells, TableFilters } from './'
import { useTrabStore } from '../../../../hooks'


export const Table = () => {

    const { trabajadores, startLoadingTrab, setActiveTrab, activeTrab } = useTrabStore()

    const [resultadoBusqueda, setResultadoBusqueda] = useState('');

    const handleBuscar = (valorBuscar, columna) => {
        const resultadosFiltrados = trabajadores.filter((trabajador) => {

            switch (columna) {
                case 'cedulaTrab':
                    return trabajador.numero_identificacion.includes(valorBuscar)
                case 'nombresTrab':
                    return trabajador.nombres.toLowerCase().includes(valorBuscar.toLowerCase())
                case 'regimen':
                    return trabajador.regimen_laboral.toLowerCase().includes(valorBuscar.toLowerCase())
                case 'modalidad':
                    return trabajador.modalidad_laboral.toLowerCase().includes(valorBuscar.toLowerCase())
                default:
                    break;
                //return permiso.motivo.toLowerCase().includes(valorBuscar.toLowerCase())
            }
        })
        setResultadoBusqueda(resultadosFiltrados)
    }

    const title = 'Lista de Servidores'
    useEffect(() => {
        setResultadoBusqueda()
    }, [])

    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={trabajadores}
                objactive={activeTrab}
                setObjecActive={setActiveTrab}
                startLoadingObjects={startLoadingTrab()}
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
