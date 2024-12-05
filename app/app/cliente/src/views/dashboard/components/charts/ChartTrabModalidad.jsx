import React, { useEffect } from 'react'
import ReactEChart from 'echarts-for-react'
import { useModalidadLaboralStore, useTrabStore } from '../../../../hooks'

export const ChartTrabModalidad = () => {
  const { trabajadores, startLoadingTrab } = useTrabStore()


  let nombramiento = [] //1.NOMBRAMIENTO
  let aut_univ = [] // AUTORIDAD UNIVERSITARIA
  let cont_indef = [] //CONTRATO INDEFINIDO
  let cont_ocac = [] //CONTRATO OCACIONAL


  for (let i = 0; i < trabajadores.length; i++) {
    const element = trabajadores[i];
    const modalidad = element.modalidad_laboral
    
    switch (true) {
      case modalidad.includes("NOMBRAMIENTO"):
        nombramiento.push(modalidad);
        break;
      case modalidad.includes("NOMBRAMIENTO AUTORIDAD UNIVERSITARIA"):
        aut_univ.push(modalidad);
        break;
      case modalidad.includes("INDEFINIDO"):
        cont_indef.push(modalidad);
        break;
      case modalidad.includes("OCASIONALES"):
        cont_ocac.push(modalidad);
        break;
      default:
        break;
    }
  }

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '1%',
      left: 'center'
    },
    series: [
      {
        name: 'Servidores por modalidad laboral',
        top: '5%',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 5
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: aut_univ.length, name: 'NOMBRAMIENTO AUTORIDAD UNIVERSITARIA' },
          { value: cont_indef.length, name: 'CONTRATO INDEFINIDO' },
          { value: cont_ocac.length, name: 'CONTRATOS OCASIONALES' },
          { value: nombramiento.length, name: 'NOMBRAMIENT0' },
        ]
      }
    ]
  };

  useEffect(() => {
    startLoadingTrab()
  }, [])
  return (
    <>
      <ReactEChart
        option={option}
      />
    </>
  )
}
