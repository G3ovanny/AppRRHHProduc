import { Paper, TableHead } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const BasicTableFIlter = ({ title, columns, rows, setObjecActive }) => {

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = objetos.map((n) => n);
            setObjecActive(newSelected);
            return;
        }
        setObjecActive([]);
    };

    const handleBoton = ()=>{
        console.log('enviar datos')
    }

    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <Paper>
                <TableHead
                    title={title}
                    //numSelected={objactive.length}
                    //tableButtons={tableButtons}
                    component="div"
                />
                <DataGrid
                    title={title}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[9, 10]}
                    checkboxSelection = {handleBoton}
                />
            </Paper>
        </div>
    )
}
