import React from 'react'
import { Table } from '../components'

export const EdAulas2 = () => {
  const title = 'Lista asistencias'
  const edificio = 'AULAS2'
  return (
    <Table title={title} edificio = {edificio} />
  )
}
