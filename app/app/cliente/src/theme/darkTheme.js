import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#150050'
        },
        tertiary: {
            main: '#3F0071'

        },
        quaternary: {
            main: '#FB2576'
        },
        error: {
            main: red.A400
        }
    }
})