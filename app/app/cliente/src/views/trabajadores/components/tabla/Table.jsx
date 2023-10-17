import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { TableCells, TableButtons, indexCells, TableFilters } from './'
import { useTrabStore } from '../../../../hooks'


export const Table = () => {

    const { trabajadores, startLoadingTrab, setActiveTrab, activeTrab, isLoadingTrab } = useTrabStore()

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
                case 'denominacionPuesto':
                    return trabajador.denominacion_puesto.toLowerCase().includes(valorBuscar.toLowerCase())
                case 'unidadOrganica':
                    return trabajador.unidad_organica.toLowerCase().includes(valorBuscar.toLowerCase())
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
    const page = 0
    const pageSize = 10
    const rowsPerPage = 0
    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={trabajadores}
                objactive={activeTrab}
                setObjecActive={setActiveTrab}
                isLoadingObjects={isLoadingTrab}
                startLoadingObjects={startLoadingTrab()}
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
