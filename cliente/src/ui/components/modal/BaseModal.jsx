import { Box, Divider, Fade, Grid, IconButton, Modal, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useModalStore } from '../../../hooks'
import { Close } from '@mui/icons-material'

export const BaseModal = ({ children, title = '', style }) => {

    const { isModalOpen, closeModal } = useModalStore()

    const handleClose = () => {
        closeModal()
    }

    return (
        <Grid >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalOpen}
                onClose={handleClose}
                closeAfterTransition
            >

                <Fade in={isModalOpen}>
                    <Box sx={style}>
                        <Toolbar
                            sx={{
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },
                            }}>
                            <Typography
                                sx={{ flex: ' 1 1 100%' }}
                                id="transition-modal-title"
                                variant="h6"
                                component="h2">
                                {title}
                            </Typography>
                            <Tooltip title="Cerrar" color="secondary" >
                                <IconButton onClick={handleClose} >
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                        <Divider />
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </Grid>
    )
}
