import { Card, CardActions, CardContent, Divider, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Cards = ({ titulo, children, botones }) => {
    return (
        <Card sx={{ minWidth: 180 }}>
            <CardContent>
                <Typography variant='h7'>
                    {titulo}
                </Typography>
                <Divider />
                {children}
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}
