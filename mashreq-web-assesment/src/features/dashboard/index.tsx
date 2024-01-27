import React from 'react'
import { Container, Avatar, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import AppToolbar from '../../components/AppToolbar';
import { useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import { useStyles } from './styles'
import { useTheme } from '@mui/material/styles'

const Dashboard: React.FC<any> = (): JSX.Element => {
    const { classes } = useStyles()
    const theme = useTheme()

    const {
        response,
    } = useSelector((state: any) => state.userAuthentication)
    const { username = '', firstName = '', lastName = '', country = '' } = response?.data || {};

    return (
        <>
            <AppToolbar />
            <Container maxWidth="md" sx={{ p: 2, mb: 8 }}>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="h5" gutterBottom color={theme.palette.primary.main} mt={1}>
                        {username}
                    </Typography>
                    <Typography variant="subtitle1">
                        {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography variant="button">
                        {country}
                    </Typography>
                </Paper>
            </Container>
        </>
    )
}

export default Dashboard
