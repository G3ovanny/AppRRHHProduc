import React, { useEffect } from 'react'
import { TableHead, TableIndex } from './'
import { Box, Paper, Table, TableContainer, Typography } from '@mui/material'

export const BasicTable = ({ title, objetos, objactive, setObjecActive, startLoadingObjects, tableCells, indexCells, tableButtons, filters }) => {

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = objetos.map((n) => n);
            setObjecActive(newSelected);
            return;
        }
        setObjecActive([]);
    };

    const onSelected = (event, guia) => {

        const selectedIndex = objactive.indexOf(guia)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(objactive, guia)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(objactive.slice(1));
        } else if (selectedIndex === objactive.length - 1) {
            newSelected = newSelected.concat(objactive.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                objactive.slice(0, selectedIndex),
                objactive.slice(selectedIndex + 1)
            );
        }
        setObjecActive(newSelected)
    }

    const isSelected = (id) => objactive.indexOf(id) !== -1;

    useEffect(() => {
        //startLoadingObjects()
    }, [])


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
                            rowCount={objetos.length}
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
