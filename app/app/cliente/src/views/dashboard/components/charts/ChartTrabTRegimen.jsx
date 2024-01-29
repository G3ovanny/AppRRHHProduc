import React, { useEffect } from 'react'

import ReactECharts from 'echarts-for-react';
import { useTrabStore } from '../../../../hooks';
export const ChartTrabTRegimen = () => {
    const { trabajadores, startLoadingTrab } = useTrabStore()

    let losep = [] //1.SERVICIO CIVIL PUBLICO (LOSEP)
    let loes = [] //3.OTROS REGIMENES ESPECIALES
    let cod_trab = [] //2.CODIGO DEL TRABAJO
    let sinAsignar = []

    for (let i = 0; i < trabajadores.length; i++) {
        const element = trabajadores[i];
        const regimen = element.regimen_laboral
        switch (true) {
            case regimen.includes("LOSEP"):
                losep.push(regimen)
                break;
            case regimen.includes("TRABAJO"):
                cod_trab.push(regimen)
                break;
            case regimen.includes("ESPECIALES"):
                loes.push(regimen)
                break;
            default:
                sinAsignar.push(regimen)
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
                name: 'Servidores por régimen laboral',
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
                    { value: losep.length, name: 'LOSEP' },
                    { value: loes.length, name: 'LOES' },
                    { value: cod_trab.length, name: 'CODIGO DE TRABAJO' },
                    { value: sinAsignar.length, name: 'OTROS' },
                ]
            }
        ]
    };
    useEffect(() => {
        startLoadingTrab()
    }, [])

    return (

        <>
            <ReactECharts
                option={option}
            />
        </>
    )
}
