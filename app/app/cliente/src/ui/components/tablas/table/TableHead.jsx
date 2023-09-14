import { TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { TableFilters } from './TableFilters'

export const TableHead = ({ title, numSelected, tableButtons, filters }) => {

    return (
        <div>
            <Toolbar
                component='div'
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected)
                }}>
                {numSelected > 0 ? (
                    <Typography sx={{ flex: "1 1 100%" }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} Seleccionados
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                )}

                {tableButtons}
            </Toolbar>
            <Toolbar
                component='div'
            >
               {filters}
            </Toolbar>
        </div>
    )
}
