import { Search } from '@mui/icons-material'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const filterOptions = [
  {
    id: 'cedulaTrab',
    label: 'Cédula',
  },
  {
    id: 'nombresTrab',
    label: 'Nombres',
  },
  {
    id: 'regLaboral',
    label: 'Régimen laboral',
  },
  {
    id: 'estado',
    label: 'Estado',
  },
  {
    id: 'edificio',
    label: 'Edificio',
  },
]
export const TableFilters = (props) => {


  const [valorBuscar, setValorBuscar] = useState('')
  const [columnaBuscar, setColumnaBuscar] = useState('cedulaTrab')
  const [fechaDesdeBuscar, setFechaDesdeBuscar] = useState(null)
  const [fechaHastaBuscar, setFechaHastaBuscar] = useState(null)

  const filtrar = () => {
    props.onBuscar(valorBuscar, columnaBuscar, fechaDesdeBuscar, fechaHastaBuscar)
  }

  const buscarBase = () => {
    props.onBuscarBase(valorBuscar, columnaBuscar, fechaDesdeBuscar, fechaHastaBuscar)
  }


  const limpiarFIltros = () => {
    setValorBuscar('')
    setColumnaBuscar('cedulaTrab')
    setFechaDesdeBuscar(null)
    setFechaHastaBuscar(null)
    filtrar()
  }

  useEffect(() => {
    props.onBuscar(valorBuscar, columnaBuscar, fechaDesdeBuscar, fechaHastaBuscar);
  }, [valorBuscar, columnaBuscar, fechaDesdeBuscar, fechaHastaBuscar]);

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
          id="outlined-start-adornment"
          label="Buscar..."
          fullWidth
          size='small'
          value={valorBuscar}
          onChange={(e) => setValorBuscar(e.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
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

      <Grid item >
        <Button
          variant="contained"
          onClick={filtrar}
        > Buscar </Button>
      </Grid>
      <Grid item >
        <Button
          variant="contained"
          onClick={buscarBase}
        > Buscar todos </Button>

      </Grid>
      <Grid item >
        <Button
          variant="contained"
          onClick={limpiarFIltros}
        >Limpiar</Button>
      </Grid>

    </Grid>
  )
}
