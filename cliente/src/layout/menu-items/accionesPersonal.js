import { AssignmentInd } from "@mui/icons-material"


const icons = {
    AssignmentInd
}


export const accionesPersonal = {
    id: 'accionesPersonal',
    title: 'Acciones de personal',
    type: 'group',
    children: [
        {
            id: 'accionespersonal',
            title: 'Acciones de personal',
            type: 'item',
            url: '/acciones-personal',
            icon: icons.AssignmentInd,
        }
    ]
}
