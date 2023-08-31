import React from 'react'
import { Table } from '../components'
import { Box } from '@mui/material'
export const EdAdminstrativo = () => {
  const title = 'Lista asistencias'
  const edificio = 'ADMINISTRATIVO'
  return (
    <Table title={title} edificio = {edificio} />
  )
}
