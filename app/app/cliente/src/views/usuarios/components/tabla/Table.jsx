import React, { useEffect, useState } from 'react'
import { BasicTable } from '../../../../ui/components/tablas'
import { TableButtons, TableCells, TableFilters, indexCells } from './'
import { useUsuarioStore } from '../../../../hooks'


export const Table = () => {
  const { listUsuario, startLoadingUsuario, setActiveUsuario, activeUsuario } = useUsuarioStore()

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


  return (
    <div
      style={{ height: 500, width: '100%' }}
    >
      <BasicTable title={title}
        objetos={listUsuario}
        objactive={activeUsuario}
        setObjecActive={setActiveUsuario}
        startLoadingObjects={startLoadingUsuario()}
        tableCells={<TableCells list={resultadoBusqueda} />}
        indexCells={indexCells}
        tableButtons={<TableButtons />}
        filters={<TableFilters onBuscar={handleBuscar} />}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9, 10]}
      />
    </div>
  )
}
