import React from 'react'
import { useDatosTrabStore } from '../../../../hooks'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

export const TableCells = ({ list }) => {
  const { datosTrab, activeDatos, setActiveDatosTrab } = useDatosTrabStore();

  const onSelected = (event, datos) => {
    const selectedIndex = activeDatos.indexOf(datos)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeDatos, datos)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeDatos.slice(1));
    } else if (selectedIndex === activeDatos.length - 1) {
      newSelected = newSelected.concat(activeDatos.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeDatos.slice(0, selectedIndex),
        activeDatos.slice(selectedIndex + 1)
      );
    }
    setActiveTrab(newSelected)
  }

  const isSelected = (id) => activeDatos.indexOf(id) !== -1
  let lista = null

  if (!list) {
    lista = datosTrab
  } else {
    lista = list
  }
  return (
    <TableBody
      component="div"
    >
      {lista.map((datos) => {
        const isItemSelected = isSelected(datos);
        return (
          <TableRow
            component="div"
            hover
            onClick={event => onSelected(event, datos)}
            role='checkbox'
            tabIndex={-1}
            key={datos.id}
            selected={isItemSelected}
          >
            <TableCell
              padding='checkbox'
              component="div"
            >
              <Checkbox
                color='primary'
                checked={isItemSelected}
              />
            </TableCell>
            <TableCell component='div' >{datos.numHijos}</TableCell>
          </TableRow>
        )
      })
      }
    </TableBody>
  )
}
