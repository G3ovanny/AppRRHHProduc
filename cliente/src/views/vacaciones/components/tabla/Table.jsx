import React from 'react'
import { TableButtons } from './TableButtons'
import { useCronogramaVacacionesStore } from '../../../../hooks'
import { TableCells } from './TableCells';
import { indexCells } from './tableindex';
import { BasicTable } from '../../../../ui/components/tablas';

export const Table = () => {
    const { listCronograma, startLoadingCronograma, setActiveCronograma, activeCronograma } = useCronogramaVacacionesStore();

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
