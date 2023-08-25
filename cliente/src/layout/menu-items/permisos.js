import { PlaylistAdd, PendingActions } from "@mui/icons-material"


const icons = {
    PlaylistAdd,
    PendingActions,
}


export const permisos = {
    id: 'permisos',
    title: 'Permisos',
    type: 'group',
    children: [
        {
            id: 'motivoPermiso',
            title: 'Motivos',
            type: 'item',
            url: '/motivo',
            icon: icons.PlaylistAdd,
        },
        {
            id: 'permisos',
            title: 'Permisos',
            type: 'item',
            url: '/permisos',
            icon: icons.PendingActions,
        }
    ]
}
