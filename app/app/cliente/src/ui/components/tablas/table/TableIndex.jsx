import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export const TableIndex = (props) => {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    indexCells
  } = props;
  return (
    <TableHead
      component="div"
    >
      <TableRow
        component="div"
      >
        <TableCell
          padding='checkbox'
          component="div"
        >
          <Checkbox
            component='div'
            color='primary'
            //indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {
          indexCells.map((indexCell) => (
            <TableCell
              key={indexCell.id}
              align={indexCell.numeric ? 'right' : 'left'}
              padding={indexCell.disablePadding ? 'none' : 'normal'}
              component='div'
            >
              {indexCell.label}
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}
