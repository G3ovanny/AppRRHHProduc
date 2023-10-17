import React, { useEffect, useState } from 'react'
import { Checkbox, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { usePermisoStore } from '../../../../hooks'
import dayjs from 'dayjs';
import { TableFilters } from './TableFilters';

export const TableCells = ({ list, page, rowsPerPage }) => {
    const { listPermiso, activePermiso, setActivePermiso } = usePermisoStore()


    const onSelected = (event, permiso) => {

        const selectedIndex = activePermiso.indexOf(permiso)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(activePermiso, permiso)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(activePermiso.slice(1));
        } else if (selectedIndex === activePermiso.length - 1) {
            newSelected = newSelected.concat(activePermiso.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                activePermiso.slice(0, selectedIndex),
                activePermiso.slice(selectedIndex + 1)
            );
        }
        setActivePermiso(newSelected)
    }
    const isSelected = (id) => activePermiso.indexOf(id) !== -1

    let lista = null

    if (!list) {
        lista = listPermiso
    } else {
        lista = list
    }


    return (
        <>
            <TableBody
                component="div"
            >
                {lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((permiso) => {
                        const isItemSelected = isSelected(permiso);
                        const salida = dayjs(permiso.fecha_hora_salida).format("D/M/YYYY - HH:mm");
                        const llegada = dayjs(permiso.fecha_hora_llegada).format("D/M/YYYY - HH:mm");
                        return (
                            <TableRow
                                component="div"
                                hover
                                onClick={event => onSelected(event, permiso)}
                                role='checkbox'
                                tabIndex={-1}
                                key={permiso.id}
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
                                    {permiso.numero_identificacion}
                                </TableCell>
                                <TableCell component='div' >{permiso.nombres}</TableCell>
                                <TableCell component='div' >{permiso.motivo}</TableCell>
                                <TableCell component='div' >{salida}</TableCell>
                                <TableCell component='div' >{llegada}</TableCell>
                                <TableCell component='div' >{permiso.min_acumulados}</TableCell>
                            </TableRow>
                        )
                    })

                }
            </TableBody>
        </>
    )
}
