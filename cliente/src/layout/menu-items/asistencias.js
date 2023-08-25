import { AlarmOn } from "@mui/icons-material"

import AlarmOnIcon from '@mui/icons-material/AlarmOn';

const icons = {
    AlarmOn
}


export const asistencias = {
    id: 'asistencias',
    title: 'Asistencia',
    type: 'group',
    children: [
        {
            id: 'asistencias',
            title: 'Asistencia',
            type: 'item',
            url: '/asistencia',
            icon: icons.AlarmOn,
        }
    ]
}
