import { Search } from "@mui/icons-material"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"


const filterOptions = [
  {
    id: 'userName',
    label: 'Usuario',
  },
  {
    id: 'nombre',
    label: 'Nombre',
  },
  {
    id: 'apellido_paterno',
    label: 'Apellido paterno',
  },

]
export const TableFilters = (props) => {
  const [valorBuscar, setValorBuscar] = useState('')
  const [columnaBuscar, setColumnaBuscar] = useState('userName')

  const filtrar = () => {
    props.onBuscar(valorBuscar, columnaBuscar)
  }
  const limpiarFIltros = () => {
    setValorBuscar('')
    setColumnaBuscar('userName')
    filtrar()
  }

  useEffect(() => {
    props.onBuscar(valorBuscar, columnaBuscar);
  }, [valorBuscar, columnaBuscar]);

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
          size='small'
          fullWidth
          value={valorBuscar}
          onChange={(e) => setValorBuscar(e.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
      </Grid>

      <Grid item 
      //xs={12} sm={6} md={2}
      >
        <Button
          variant="contained"
          onClick={filtrar}
        > Buscar </Button>

      </Grid>
      <Grid item 
      //xs={12} sm={6} md={2}
      >
        <Button
          variant="contained"
          onClick={limpiarFIltros}
        >Limpiar</Button>
      </Grid>
    </Grid>
  )
}
