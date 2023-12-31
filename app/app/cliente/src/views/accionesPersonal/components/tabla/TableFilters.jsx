import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const filterOptions = [
  {
    id: 'nombresTrab',
    label: 'Nombres',
  },
  {
    id: 'tipoAccion',
    label: 'Tipo acción personal',
  },
  {
    id: 'contador',
    label: 'N° acción personal',
  },
]
export const TableFilters = (props) => {
  const [valorBuscar, setValorBuscar] = useState('')
  const [columnaBuscar, setColumnaBuscar] = useState('nombresTrab');
  const [fechaRegistroBuscar, setFechaRegistroBuscar] = useState(null);
  const [fechaDesdeBuscar, setFechaDesdeBuscar] = useState(null);
  const [fechaHastaBuscar, setFechaHastaBuscar] = useState(null);

  const filtrar = () => {
    props.onBuscar(
      valorBuscar,
      columnaBuscar,
      fechaRegistroBuscar,
      fechaDesdeBuscar,
      fechaHastaBuscar
    )
  }
  const limpiarFIltros = () => {
    setValorBuscar('')
    setColumnaBuscar('cedulaTrab')
    setFechaRegistroBuscar(null)
    setFechaDesdeBuscar(null)
    setFechaHastaBuscar(null)
    filtrar()
  }

  useEffect(() => {
    props.onBuscar(
      valorBuscar,
      columnaBuscar,
      fechaRegistroBuscar,
      fechaDesdeBuscar,
      fechaHastaBuscar
    );
  }, [valorBuscar, columnaBuscar, fechaRegistroBuscar, fechaDesdeBuscar, fechaHastaBuscar]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl
          fullWidth
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
      <Grid item xs={12} sm={6} md={2} >
        <TextField
          fullWidth
          id="outlined-start-adornment"
          label="Buscar..."
          size='small'
          value={valorBuscar}
          onChange={(e) => setValorBuscar(e.target.value)}
          InputProps={{
            startAdornment: <Search />
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{ textField: { size: 'small' } }}
            label="Fecha de registro"
            value={fechaRegistroBuscar}
            onChange={(newValue) => setFechaRegistroBuscar(dayjs(newValue))}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{ textField: { size: 'small' } }}
            label="Desde"
            value={fechaDesdeBuscar}
            onChange={(newValue) => setFechaDesdeBuscar(dayjs(newValue))}
          />

        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{ textField: { size: 'small' } }}
            size="small"
            label="Hasta"
            value={fechaHastaBuscar}
            onChange={(newValue) => setFechaHastaBuscar(dayjs(newValue))}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item
      //xs={3} sm={6} md={2}
      >
        <Button
          variant="contained"
          onClick={filtrar}
        > Buscar </Button>

      </Grid>
      <Grid item
      //xs={3} sm={6} md={2}
      >
        <Button
          variant="contained"
          onClick={limpiarFIltros}
        >Limpiar</Button>
      </Grid>
    </Grid>
  )
}
