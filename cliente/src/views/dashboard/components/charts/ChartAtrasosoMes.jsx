import React from 'react'
import ReactECharts from 'echarts-for-react';

export const ChartAtrasosoMes = () => {
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
                data: [
                    10,
                    300,
                    //{value: 200, itemStyle: { color: '#a90000'}},
                    200,
                    334,
                    390,
                    330,
                    220,
                    10,
                    52,
                    200,
                    334,
                    500,
                ]
            }
        ]
    };
    return (
            <ReactECharts
                option={option}
            />
    )
}
