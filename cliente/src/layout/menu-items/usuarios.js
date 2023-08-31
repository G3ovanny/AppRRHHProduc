import { AccountCircle } from "@mui/icons-material"
const icons = {
    AccountCircle,
}
export const usuarios = {
    id: 'usuarios',
    title: 'Usuarios',
    type: 'group',
    children: [
        {
            id: 'usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/usuarios',
            icon: icons.AccountCircle,
        }
    ]
}