import { WorkHistory } from "@mui/icons-material"


const icons = {
    WorkHistory,
}



export const vacaciones = {
    id: 'vacaciones',
    title: 'Vacaciones',
    type: 'group',
    children: [
        {
            id: 'cronogramaVacaciones',
            title: 'Cronograma',
            type: 'item',
            url: '/cronograma',
            icon: icons.WorkHistory,
        }
    ]
}