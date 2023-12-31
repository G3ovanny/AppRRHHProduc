import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useAsistenciaStore } from '../../../../hooks'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
export const TableCells = ({ list, page, rowsPerPage }) => {
  const { listAsistencia, activeAsistencia, setActiveAsistencia } = useAsistenciaStore();

  const onSelected = (event, asistencia) => {

    const selectedIndex = activeAsistencia.indexOf(asistencia)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeAsistencia, asistencia)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeAsistencia.slice(1));
    } else if (selectedIndex === activeAsistencia.length - 1) {
      newSelected = newSelected.concat(activeAsistencia.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeAsistencia.slice(0, selectedIndex),
        activeAsistencia.slice(selectedIndex + 1)
      );
    }
    setActiveAsistencia(newSelected)
  }
  const isSelected = (id) => activeAsistencia.indexOf(id) !== -1

  let lista = null

  if (!list) {
    lista = listAsistencia
  } else {
    lista = list
  }

  return (
    <TableBody
      component='div'
    >
      {lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((asistencia) => {
          const isItemSelected = isSelected(asistencia)
          dayjs.extend(utc);
          const registro = dayjs.utc(asistencia.hora).format("YYYY-MM-DD HH:mm:ss");
          return (
            <TableRow
              component='div'
              hover
              key={asistencia.id}
              onClick={event => onSelected(event, asistencia)}
              role='checkbox'
              tabIndex={-1}
              selected={isItemSelected}
            >
              <TableCell
                padding='checkbox'
                component='div'
              >
                <Checkbox
                  component='div'
                  color='primary'
                  checked={isItemSelected}
                />
              </TableCell>
              <TableCell component='div'> {asistencia.numero_identificacion}</TableCell>
              <TableCell component='div'> {asistencia.nombres}</TableCell>
              <TableCell component='div'> {asistencia.regimen_laboral}</TableCell>
              {/* <TableCell component='div'> {asistencia.hora}</TableCell> */}
              <TableCell component='div'> {registro}</TableCell>
              {/* <TableCell component='div'> {dayjs(asistencia.hora).format("D/M/YYYY HH:mm:ss")}</TableCell> */}
              <TableCell component='div'> {asistencia.estado}</TableCell>
              <TableCell component='div'> {asistencia.edificio}</TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
  )
}
