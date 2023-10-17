import React from 'react'
import { useUsuarioStore } from '../../../../hooks'
import { Checkbox, Switch, TableBody, TableCell, TableRow } from '@mui/material';

export const TableCells = ({ list, page, rowsPerPage }) => {
  const { listUsuario, activeUsuario, setActiveUsuario } = useUsuarioStore();


  const onSelected = (event, usuario) => {

    const selectedIndex = activeUsuario.indexOf(usuario)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeUsuario, usuario)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeUsuario.slice(1));
    } else if (selectedIndex === activeUsuario.length - 1) {
      newSelected = newSelected.concat(activeUsuario.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeUsuario.slice(0, selectedIndex),
        activeUsuario.slice(selectedIndex + 1)
      );
    }
    setActiveUsuario(newSelected)
  }
  const isSelected = (id) => activeUsuario.indexOf(id) !== -1

  let lista = null

  if (!list) {
    lista = listUsuario
  } else {
    lista = list
  }
  return (
    <TableBody
      component="div"
    >
      {lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((usuario) => {
          const isItemSelected = isSelected(usuario);
          const estado = usuario.is_staff
          return (
            <TableRow
              component="div"
              hover
              onClick={event => onSelected(event, usuario)}
              role='checkbox'
              tabIndex={-1}
              key={usuario.id}
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
                {usuario.nombre}
              </TableCell>
              <TableCell component='div' >{usuario.apellido_paterno}</TableCell>
              <TableCell component='div' >{usuario.correo}</TableCell>
              <TableCell component='div' >{usuario.username}</TableCell>
              <TableCell component='div' >
                <Switch
                  color="primary"
                  size='small'
                  //disabled
                  checked={estado} />
              </TableCell>

            </TableRow>
          )
        })
      }
    </TableBody>
  )
}
