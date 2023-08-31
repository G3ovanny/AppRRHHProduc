import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { useTrabStore } from '../../../../hooks'

export const TableCells = ({ list }) => {

    const { trabajadores, activeTrab, setActiveTrab } = useTrabStore();

    const onSelected = (event, trabajador) => {

        const selectedIndex = activeTrab.indexOf(trabajador)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(activeTrab, trabajador)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(activeTrab.slice(1));
        } else if (selectedIndex === activeTrab.length - 1) {
            newSelected = newSelected.concat(activeTrab.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                activeTrab.slice(0, selectedIndex),
                activeTrab.slice(selectedIndex + 1)
            );
        }
        setActiveTrab(newSelected)
    }

    const isSelected = (id) => activeTrab.indexOf(id) !== -1

    let lista = null

    if (!list) {
        lista = trabajadores
    } else {
        lista = list
    }


    return (
        <TableBody
            component="div"
        >
            {lista.map((trabajador) => {
                const isItemSelected = isSelected(trabajador);
                return (
                    <TableRow
                        component="div"
                        hover
                        onClick={event => onSelected(event, trabajador)}
                        role='checkbox'
                        tabIndex={-1}
                        key={trabajador.id}
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
                            {trabajador.numero_identificacion}
                        </TableCell>
                        <TableCell component='div' >{trabajador.nombres}</TableCell>
                        {/*<TableCell component='div' >{trabajador.celular}</TableCell>*/}
                        <TableCell component='div' >{trabajador.unidad_organica}</TableCell>
                        <TableCell component='div' >{trabajador.denominacion_puesto}</TableCell>
                        <TableCell component='div' >{trabajador.dias_vacaciones}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}
