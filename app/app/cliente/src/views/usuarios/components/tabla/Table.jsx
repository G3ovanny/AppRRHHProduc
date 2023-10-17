import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { TableButtons, TableCells, TableFilters, indexCells } from './'
import { useUsuarioStore } from '../../../../hooks'


export const Table = () => {
  const { listUsuario, startLoadingUsuario, setActiveUsuario, activeUsuario, isLoadingUsuario } = useUsuarioStore()

  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

  const handleBuscar = (valorBuscar, columna) => {
    const resultadosFiltrados = listUsuario.filter((usuario) => {

      switch (columna) {
        case 'userName':
          //break;  
          return usuario.username.includes(valorBuscar)
        case 'nombre':
          //break;  
          return usuario.nombre.toLowerCase().includes(valorBuscar.toLowerCase())
        case 'apellido_paterno':
          //break;  
          return usuario.apellido_paterno.toLowerCase().includes(valorBuscar.toLowerCase())
        default:
          break;
        //return usuario.estado.toLowerCase().includes(valorBuscar.toLowerCase())
      }

    })
    setResultadoBusqueda(resultadosFiltrados);
  }

  useEffect(() => {
    setResultadoBusqueda()
  }, [])

  const title = 'Lista de usuarios'

  const page = 0
  const pageSize = 5
  const rowsPerPage= 0
  return (
    <div
      style={{ height: 500, width: '100%' }}
    >
      <BasicTable title={title}
        objetos={listUsuario}
        objactive={activeUsuario}
        setObjecActive={setActiveUsuario}
        isLoadingObjects={isLoadingUsuario}
        startLoadingObjects={startLoadingUsuario()}
        tableCells={<TableCells list={resultadoBusqueda} page={page} rowsPerPage={rowsPerPage}/>}
        indexCells={indexCells}
        tableButtons={<TableButtons />}
        filters={<TableFilters onBuscar={handleBuscar} />}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  )
}
