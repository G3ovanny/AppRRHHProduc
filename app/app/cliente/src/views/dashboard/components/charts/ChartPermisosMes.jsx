import React, { useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { usePermisoStore } from '../../../../hooks';
import dayjs from 'dayjs';

export const ChartPermisosMes = () => {
    const { listPermiso, startLoadingPermiso } = usePermisoStore();
    const anioActual = dayjs().year();

    // Memoriza la lista filtrada de permisos y el cálculo de permisos por mes
    const groupedData = useMemo(() => {
        // Filtrar permisos del año actual
        const lista = listPermiso.filter((permisos) => 
            dayjs(permisos.fecha_hora_salida).year() === anioActual
        );

        // Agrupar por mes
        const data = {};
        lista.forEach(permiso => {
            const fecha = dayjs(permiso.fecha_hora_salida);
            const month = fecha.month() + 1; // Mes de 1 a 12

            const key = `${anioActual}-${month}`;
            if (!data[key]) {
                data[key] = 0;
            }
            data[key]++;
        });

        // Completar todos los meses con 0 en caso de que no haya permisos
        const mesesDelAnio = Array.from({ length: 12 }, (_, index) => {
            const month = index + 1;
            return `${anioActual}-${month}`;
        });

        return mesesDelAnio.reduce((result, key) => {
            result[key] = data[key] || 0;
            return result;
        }, {});
    }, [listPermiso, anioActual]);

    const data = Object.values(groupedData);

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
            }
        ]
    };

    useEffect(() => {
        startLoadingPermiso();
    }, [startLoadingPermiso]);

    return <ReactECharts option={option} />;
};