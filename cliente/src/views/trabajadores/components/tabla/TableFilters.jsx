import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const filterOptions = [
    {
        id: 'cedulaTrab',
        label: 'Cédula',
    },
    {
        id: 'nombresTrab',
        label: 'Nombres',
    },

]
export const TableFilters = (props) => {
    const [valorBuscar, setValorBuscar] = useState('')
    const [columnaBuscar, setColumnaBuscar] = useState('cedulaTrab')

    const filtrar = () => {
        props.onBuscar(valorBuscar, columnaBuscar)
    }
    const limpiarFIltros = () => {
        setValorBuscar('')
        setColumnaBuscar('cedulaTrab')
        filtrar()
    }

    useEffect(() => {
        props.onBuscar(valorBuscar, columnaBuscar);
    }, [valorBuscar, columnaBuscar]);
    return (
        <Grid
            container columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
            <Grid item xs={12} sm={12} md={2} sx={{ mt: 2 }}>
                <FormControl
                    sx={{ minWidth: 185 }}
                    size="small"
                >
                    <InputLabel id="demo-simple-select-label">Filtrar por:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="FIltrar por :"
                        value={columnaBuscar || ''}
                        onChange={(e) => setColumnaBuscar(e.target.value)}
                    >
                        {filterOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2} sx={{ mt: 2 }} >
                <TextField
                    id="outlined-start-adornment"
                    label="Buscar..."
                    size='small'
                    sx={{ minWidth: 185 }}
                    value={valorBuscar}
                    onChange={(e) => setValorBuscar(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={1} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={filtrar}
                > Buscar </Button>

            </Grid>
            <Grid item xs={12} sm={12} md={1} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={limpiarFIltros}
                >Limpiar</Button>
            </Grid>
        </Grid>
    )
}
