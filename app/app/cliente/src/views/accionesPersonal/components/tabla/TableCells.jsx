import React from 'react'

import { indexCells } from './tableindex'
import { useAccionPersonalStore } from '../../../../hooks'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

export const TableCells = ({ list, page, rowsPerPage }) => {
  const { listAccion, activeAccion, setActiveAccion } = useAccionPersonalStore();

  const onSelected = (event, accion) => {

    const selectedIndex = activeAccion.indexOf(accion)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeAccion, accion)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeAccion.slice(1));
    } else if (selectedIndex === activeAccion.length - 1) {
      newSelected = newSelected.concat(activeAccion.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeAccion.slice(0, selectedIndex),
        activeAccion.slice(selectedIndex + 1)
      );
    }
    setActiveAccion(newSelected)
  }
  const isSelected = (id) => activeAccion.indexOf(id) !== -1

  let lista = null

  if (!list) {
    lista = listAccion
  } else {
    lista = list
  }

  return (
    <TableBody
      component="div"
    >
      {lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((accion) => {
          const isItemSelected = isSelected(accion);

          return (
            <TableRow
              component="div"
              hover
              onClick={event => onSelected(event, accion)}
              role='checkbox'
              tabIndex={-1}
              key={accion.id}
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
              //scope='patient'
              //padding='none'
              >
                {accion.contador}
              </TableCell>
              <TableCell component='div'>{accion.apellido_paterno} {accion.apellido_materno} {accion.nombres}</TableCell>
              <TableCell component='div'>{accion.tipo_accion}</TableCell>
              <TableCell component='div'>{dayjs(accion.fecha_accion).format("D/M/YYYY")}</TableCell>
              <TableCell component='div'>{dayjs(accion.fecha_rigue).format("D/M/YYYY")}</TableCell>
              <TableCell component='div'>{accion.estado_accion}</TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
  )
}
