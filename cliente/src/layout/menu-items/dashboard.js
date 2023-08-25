import { Dashboard } from "@mui/icons-material"


const icons = {
    Dashboard,
}

export const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.Dashboard,
        }
    ]
}

