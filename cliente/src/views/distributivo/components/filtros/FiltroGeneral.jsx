import { Search } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const FiltroGeneral = (props) => {

  const [valorBuscar, setValorBuscar] = useState('')

  useEffect(() => {
    props.onBuscar(valorBuscar)
  }, [valorBuscar])

  return (
    <TextField
      id="outlined-start-adornment"
      label="Buscar..."
      size='small'
      sx={{ minWidth: 185 }}
      value={valorBuscar}
      onChange={(e) => setValorBuscar(e.target.value)}
      InputProps={{
        startAdornment: <Search />
      }}
    />
  )
}
