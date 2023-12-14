import { Avatar, Divider, Fade, IconButton, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { AccountCircle, Logout, PersonAdd, Settings, ManageAccounts } from '@mui/icons-material';
import { useAuthStore } from '../../hooks';
import { useNavigate } from 'react-router-dom'
export const Profile = () => {
    const { startLogout } = useAuthStore();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useNavigate()

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPerfil = () => {
        history('/perfil');
    }

    const handleLogout = () => {
        startLogout();
    }

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >

                <MenuItem onClick={openPerfil}>
                    <ListItemIcon>
                        <ManageAccounts fontSize="small" />
                    </ListItemIcon>
                    Mi perfil
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem> */}
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Configuración
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Salir
                </MenuItem>
            </Menu>
            {/* <PerfilModal titleModal={nameModal} /> */}
        </div>
    )
}
