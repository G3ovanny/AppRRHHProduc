import React from 'react'
import ReactECharts from 'echarts-for-react';
import { usePermisoStore } from '../../../../hooks';
import dayjs from 'dayjs';

export const ChartMasPermisoMes = () => {
  const { listPermiso } = usePermisoStore()

  const anioActual = dayjs().year()
  
  const lista = listPermiso.filter((permisos) =>
    dayjs(permisos.fecha_hora_salida).year() === anioActual
  )

  const idsUnicos = new Set();
  //obtengo los id de los trabajadores
  lista.forEach((permiso) => {
    idsUnicos.add(permiso.id_trabajador);
  });
  //Se convierte en un arreglo
  const idsUnicosArray = Array.from(idsUnicos);

  const lista_contadores = []

  idsUnicosArray.forEach(element => {
    const nueva_list = listPermiso.filter(item => item.id_trabajador === element)
    const contador = nueva_list.length
    const nombres = nueva_list.map(elemento => elemento.nombres)

    const dicc = [contador, nombres[0]]
    lista_contadores.push(dicc)
  });
  lista_contadores.sort()
  const source = lista_contadores.slice(-5);

  console.log(source)
  const option = {
    dataset: {
      source
      // source: [
      //   //['score', 'product'],
      //   [89.3, 'Matcha Latte'],
      //   [57.1, 'Milk Tea'],
      //   [74.4, 'Cheese Cocoa'],
      //   [50.1, 'Cheese Brownie'],
      //   [89.7, 'Matcha Cocoa'],
      // ]
    },
    grid: { containLabel: true },
    xAxis: { name: '' },
    yAxis: { type: 'category' },

    series: [
      {
        name: 'Permisos',
        type: 'bar',
        barWidth: '60%',
        encode: {
          // Map the "amount" column to X axis.
          //x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
    />
  )
}
