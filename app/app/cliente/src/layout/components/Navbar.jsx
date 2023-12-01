import { LogoutOutlined, MenuOpenOutlined } from "@mui/icons-material"
import { AppBar, Box, Toolbar, IconButton, Typography, Grid, Drawer } from "@mui/material"
import { Navigation, Profile } from "."
import { useAuthStore, useMenuStore } from "../../hooks"
import { Outlet } from "react-router-dom"

const drawerWidth = 240
export const Navbar = ({ window }) => {

    const { startLogout } = useAuthStore();

    const { isOpenMenu, openMenu, closeMenu } = useMenuStore();

    const abrirHandle = () => {
        openMenu()
    }
    const cerrarHandle = () => {
        closeMenu()
    }

    // const handleLogout = () => {
    //     startLogout();
    // }

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box >
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        edge='start'
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        onClick={abrirHandle}>
                        <MenuOpenOutlined />
                    </IconButton>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography className='animate__animated animate__jackInTheBox'>Talento Humano</Typography>
                        
                        {/* <IconButton color='quaternary' onClick={handleLogout}>
                            <LogoutOutlined />
                        </IconButton> */}
                        
                        <Profile />

                    </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={isOpenMenu}
                    onClose={cerrarHandle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        overflow: 'auto',
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    <Navigation />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <Navigation />
                </Drawer>
            </Box>
        </Box>
    )
}
