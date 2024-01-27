import {
    cyan,
    green,
    lightBlue,
    lightGreen,
    orange,
    teal
} from '@mui/material/colors'
import { Countries} from '../config/constants'

//Theme platette options and name is there to identify based on countrys
export const AppThemeOptions: any[] = [
    {
        name: Countries.Saudia,
        palette: { primary: { main: "#154734" }, secondary: { main: lightGreen[400] } },
    },
    {
        name: Countries.Egypt,
        palette: { primary: { main: cyan[800] }, secondary: { main: cyan[200] } },
    },
    {
        name: Countries.India,
        palette: { primary: { main: lightBlue[800] }, secondary: { main: lightBlue[200] } },
    },
    {
        name: Countries.UAE,
        palette: { primary: { main: orange[600] }, secondary: { main: orange[300] } },
    },
    {
        name: 'Default',
        palette: { primary: { main: teal[900] }, secondary: { main: teal[300] } },
    },
]