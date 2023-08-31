import React, { useEffect } from 'react'
import { TableHead, TableIndex } from './'
import { Box, Paper, Table, TableContainer, Typography } from '@mui/material'

export const BasicTable = ({ title, objetos, objactive, setObjecActive, startLoadingObjects, tableCells, indexCells, tableButtons, filters }) => {

    const datos = tableCells.props.list
    let lista
    if (datos) {
        lista = datos
    } else {
        lista = objetos
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = lista.map((n) => n);
            setObjecActive(newSelected);
            return;
        }
        setObjecActive([]);
    };

    return (
        <div>
            <Paper
                component='div'
            >
                <TableHead
                    title={title}
                    numSelected={objactive.length}
                    filters={filters}
                    tableButtons={tableButtons}
                    component="div"
                />
                <TableContainer
                    sx={{ maxHeight: 440 }}
                    component="div"
                >
                    <Table
                        aria-labelledby='tableTittle'
                        component="div"
                    >
                        <TableIndex
                            onSelectAllClick={handleSelectAllClick}
                            numSelected={objactive.length}
                            rowCount={lista.length}
                            indexCells={indexCells}
                            component="div"
                        />
                        {tableCells}
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}
