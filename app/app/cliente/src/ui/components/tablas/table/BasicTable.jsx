import { cloneElement, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableIndex, TableSkeleton } from './'
import { Paper, Table, TableContainer, TablePagination } from '@mui/material'

export const BasicTable = ({
    title,
    objetos,
    objactive,
    setObjecActive,
    tableCells,
    indexCells,
    tableButtons,
    filters,
    isLoadingObjects,
    pageSizeOptions,
    initialState
}) => {
    const initialPaginationState = initialState.pagination.paginationModel;
    const [page, setPage] = useState(initialPaginationState.page);
    const [rowsPerPage, setRowsPerPage] = useState(initialPaginationState.pageSize);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const datos = tableCells.props.list || objetos;
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = datos.map((n) => n);
            setObjecActive(newSelected);
        } else {
            setObjecActive([]);
        }
    };

    return (
        <>
            {isLoadingObjects ? (
                <TableSkeleton />
            ) : (
                <div>
                    <Paper component='div'>
                        <TableHead
                            title={title}
                            numSelected={objactive.length}
                            filters={filters}
                            tableButtons={tableButtons}
                            component="div"
                        />
                        <TableContainer sx={{ maxHeight: 440 }} component="div">
                            <Table aria-labelledby='tableTittle' component="div">
                                <TableIndex
                                    onSelectAllClick={handleSelectAllClick}
                                    numSelected={objactive.length}
                                    rowCount={datos.length}
                                    indexCells={indexCells}
                                    component="div"
                                />
                                {cloneElement(tableCells, { page, rowsPerPage })}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={pageSizeOptions}
                            component="div"
                            count={datos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Filas por página:"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                            //labelRowsPerPageOptions="Filas por página:"
                        />
                    </Paper>
                </div>
            )}
        </>
    )
}

BasicTable.propTypes = {
    title: PropTypes.string.isRequired,
    objetos: PropTypes.array.isRequired,
    objactive: PropTypes.array.isRequired,
    setObjecActive: PropTypes.func.isRequired,
    tableCells: PropTypes.element.isRequired,
    indexCells: PropTypes.array.isRequired,
    tableButtons: PropTypes.element.isRequired,
    //filters: PropTypes.array.isRequired,
    //isLoadingObjects: PropTypes.bool.isRequired,
    pageSizeOptions: PropTypes.array.isRequired,
    initialState: PropTypes.object.isRequired,
}
