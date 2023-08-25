import React from 'react'
import { useCronogramaVacacionesStore } from '../../../../hooks'
import { Button, Checkbox, Switch, TableBody, TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs';

export const TableCells = () => {
  const { listCronograma, activeCronograma, setActiveCronograma } = useCronogramaVacacionesStore()

  const onSelected = (event, cronograma) => {

    const selectedIndex = activeCronograma.indexOf(cronograma)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeCronograma, cronograma)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeCronograma.slice(1));
    } else if (selectedIndex === activeCronograma.length - 1) {
      newSelected = newSelected.concat(activeCronograma.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeCronograma.slice(0, selectedIndex),
        activeCronograma.slice(selectedIndex + 1)
      );
    }
    setActiveCronograma(newSelected)
  }
  const isSelected = (id) => activeCronograma.indexOf(id) !== -1
  return (
    <TableBody
      component="div"
    >
      {
        listCronograma.map((cronograma) => {
          const isItemSelected = isSelected(cronograma);
          const inicio = dayjs(cronograma.fecha_inicio).format('DD/MM/YYYY');
          const fin = dayjs(cronograma.fecha_fin).format('DD/MM/YYYY');
          const estado = cronograma.estado_accion
          return (
            <TableRow
              component="div"
              hover
              onClick={event => onSelected(event, cronograma)}
              role='checkbox'
              tabIndex={-1}
              key={cronograma.id}
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
              <TableCell
                component='div'
                scope='patient'
                padding='none'
              >
                {cronograma.numero_identificacion}
              </TableCell>
              <TableCell component='div' >{cronograma.nombres}</TableCell>
              <TableCell component='div' >{inicio}</TableCell>
              <TableCell component='div' >{fin}</TableCell>
              <TableCell component='div' >{cronograma.min_acumulados / 480}</TableCell>
              <TableCell component='div' >
                <Switch
                  color="error"
                  size='small'
                  disabled
                  checked={estado} />
              </TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
  )
}
