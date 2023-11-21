'use client'
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        background: {
            default: '#738ef9',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "green"
                },

            }
        }
    }
});

export default theme;