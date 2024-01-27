import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    Toolbar,
    Typography,
    MenuItem,
    Tooltip,
    Menu,
    AppBar
} from '@mui/material'
import { Countries, CountryImages, DefaultValues, Languages, LanguagesImages } from '../../config/constants';
import Translate from '@mui/icons-material/Translate';
import { setLanguage } from '../../config/utils'
import { AppThemeContext, CountryThemeContext } from '../../themes/AppTheme';
import CustomAvatar from '../CustomAvatar';
import { AppThemeOptions } from '../../themes/ThemeOptions';
import { createTheme, useTheme } from '@mui/material/styles'

const AppToolbar: React.FC<any> = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElCountry, setAnchorElCountry] = React.useState<null | HTMLElement>(null);
    const { country, setCountry } = useContext(CountryThemeContext)
    const { setAppTheme } = useContext(AppThemeContext)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenUserCountry = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCountry(event.currentTarget);
    };

    const handleCloseUserCountry = () => {
        setAnchorElCountry(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLanguageChange = (language: string) => {
        setLanguage(language)
        handleCloseUserMenu()
    }

    const onCountryChange = (country: string) => {
        handleCloseUserCountry();
        const theme = AppThemeOptions.find(theme => theme.name === country)
        setAppTheme({
            name: theme.name,
            theme: createTheme({ palette: theme.palette }),

        })
        setCountry({ country })
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>

                    <Tooltip title="Change Country" onClick={handleOpenUserCountry}>
                        <Button color="inherit" startIcon={
                            <CustomAvatar src={
                                country?.country ? CountryImages[country?.country] : DefaultValues.CountryImage
                            } alt={country?.country || ""} />
                        }>{country?.country}</Button>
                    </Tooltip>

                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElCountry}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElCountry)}
                        onClose={handleCloseUserCountry}
                    >
                        {Object.keys(Countries).map((country) => (
                            <MenuItem key={country} onClick={() => onCountryChange(country)}>
                                <CustomAvatar src={CountryImages[country]} alt={country} />

                                <Typography textAlign="center">{country}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>


                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Change language" onClick={handleOpenUserMenu}>
                        <Button color="inherit" startIcon={<Translate />}>{i18n.language.toUpperCase()}</Button>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {Object.keys(Languages).map((language) => (
                            <MenuItem key={language} onClick={() => onLanguageChange(language)}>
                                <CustomAvatar src={LanguagesImages[language]} alt={language} />

                                <Typography textAlign="center">{t(`languages.${language}`)}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AppToolbar
