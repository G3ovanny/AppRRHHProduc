import * as React from 'react';
import { BasicTableFIlter } from '../../../../ui/components/';
import { columns } from './tablefilterindex';
import { useTrabStore } from '../../../../hooks';

export const TableFilter = () => {
    const title = 'Titulo tabla'
    const rows = []
    const { trabajadores, startLoadingTrab, setActiveTrab, activeTrab } = useTrabStore()

    console.log(trabajadores)
    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTableFIlter
                title={title}
                rows={trabajadores}
                columns={columns}
                startLoadingObjects={startLoadingTrab()}
                setObjecActive={setActiveTrab}

            />
        </div>
    )
}
