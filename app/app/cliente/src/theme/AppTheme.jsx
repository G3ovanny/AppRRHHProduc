import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { naviTheme, purpleTheme, darkTheme } from './'

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={naviTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
