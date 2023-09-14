import React, { useEffect } from 'react'
import ReactECharts from 'echarts-for-react';
import { usePermisoStore } from '../../../../hooks';
import dayjs from 'dayjs';

export const ChartPermisosMes = () => {
    const { listPermiso, startLoadingPermiso } = usePermisoStore()

    //console.log('lista permisos', listPermiso)
    const anioActual = dayjs().year()

    const lista = listPermiso.filter((permisos) =>
        dayjs(permisos.fecha_hora_salida).year() === anioActual
    )
    const groupedData = {};
    if (lista.length !== 0) {

        lista.forEach(permiso => {
            const fecha = dayjs(permiso.fecha_hora_salida)
            const year = fecha.year()
            const month = fecha.month() + 1

            const key = `${year}-${month}`;

            if (!groupedData[key]) {
                groupedData[key] = 0;
            }

            groupedData[key]++;
        });
    }


    const mesesDelAnio = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        return `${anioActual}-${month.toString().padStart(1)}`;
    });

    const countsByMonth = mesesDelAnio.reduce((result, key) => {
        result[key] = groupedData[key] || 0;
        return result;
    }, {});
    const data = Object.values(countsByMonth);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
            }
        ],
        series: [
            {
                name: 'Permisos',
                type: 'bar',
                barWidth: '60%',
                data
                // data: [
                //     10,
                //     300,
                //     //{value: 200, itemStyle: { color: '#a90000'}},
                //     200,
                //     334,
                //     390,
                //     330,
                //     220,
                //     10,
                //     52,
                //     200,
                //     334,
                //     500,
                // ]
            }
        ]
    };
    useEffect(() => {
        startLoadingPermiso()
    }, [])

    return (
        <>
            <ReactECharts
                option={option}
            />
        </>
    )
}
