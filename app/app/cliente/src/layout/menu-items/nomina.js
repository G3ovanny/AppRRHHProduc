import { Person, ManageAccounts,FolderShared } from "@mui/icons-material"

const icons = {
    Person,
    ManageAccounts,
    FolderShared,
}


export const nomina = {
    id: 'nomina',
    title: 'Nómina',
    type: 'group',
    children: [
        {
            id: 'distributivo',
            title: 'Distributivo',
            type: 'item',
            url: '/distributivo',
            icon: icons.ManageAccounts,
        },
        {
            id: 'srvidores',
            title: 'Servidores',
            type: 'item',
            url: '/servidores',
            icon: icons.Person,
        },
        // {
        //     id: 'datosServidores',
        //     title: 'Más datos',
        //     type: 'item',
        //     url: '/datos_servidores',
        //     icon: icons.FolderShared,
        // }
    ]
}
