import { createTheme } from "@mui/material";
import { red  } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette:{
        primary: {
            main: '#645CAA'
        },
        secondary: {
            main: '#A084CA'
        },
        tertiary: {
            main: '#BFACE0'

        },
        quaternary: {
            main: '#EBC7E8'
        },
        error: {
            main: red.A400
        }
    }
})