import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const naviTheme = createTheme({
    palette: {
        primary: {
            main: '#1A374D'
        },
        secondary: {
            main: '#406882'
        },
        tertiary: {
            main: '#6998AB'

        },
        quaternary: {
            main: '#B1D0E0'
        },
        error: {
            main: red.A400
        }
    }
})