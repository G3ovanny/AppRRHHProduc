import React from 'react'
import { Table } from '../components'

export const EdAulas1 = () => {
  const title = 'Lista asistencias'
  const edificio = 'AULAS1'
  return (
    <Table title={title} edificio={edificio} />
  )
}
