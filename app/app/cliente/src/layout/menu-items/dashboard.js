import { Dashboard, AccountBox } from "@mui/icons-material"

const icons = {
    Dashboard,
    AccountBox,
}

export const dashboard = {
    id: 'dashboard',
    title: 'Panel de control',
    type: 'group',
    children: [
        // {
        //     id: 'dashboard',
        //     title: 'Dashboard',
        //     type: 'item',
        //     url: '/dashboard',
        //     icon: icons.Dashboard,
        // },
        {
            id: 'profile',
            title: 'Mi perfil',
            type: 'item',
            url: '/perfil',
            icon: icons.AccountBox,
        }
    ]
}

