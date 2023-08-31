import React from 'react'
import { Table } from '../components'

export const EdAulas3 = () => {
  const title = 'Lista asistencias'
  const edificio= 'AULAS3'
  return (
    <Table title = {title} edificio={edificio}/>
  )
}
