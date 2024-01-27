import React, { useEffect, useContext } from 'react'
import {
    Box,
    Button,
    TextField,
    Link,
    Grid,
    Avatar,
    Typography,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    ListItemIcon
} from '@mui/material'
import { createTheme, useTheme } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next'
import { AppThemeContext, CountryThemeContext } from '../../themes/AppTheme'
import { AppThemeOptions } from '../../themes/ThemeOptions'
import { Countries, CountryImages, APIStatus, DefaultValues } from '../../config/constants';
import CustomAvatar from '../../components/CustomAvatar';
import AppToolbar from '../../components/AppToolbar';
import { validationsLoginForm } from '../../config/validations';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loginUserRequest } from '../../redux/actions/userAuthenticationActions'
import Loader from '../../components/Loader';

const Login: React.FC<any> = (): JSX.Element => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const theme = useTheme()
    const { setAppTheme } = useContext(AppThemeContext)
    const { country, setCountry } = useContext(CountryThemeContext)

    const {
        response,
        loading,
        error
    } = useSelector((state: any) => state.userAuthentication)

    const countrySpecificUsernameValidationHelper: any = {
        [Countries.UAE]: `${t('validations.usernameHelperUAE')}`,
        [Countries.India]: `${t('validations.usernameHelperIndia')}`,
        [Countries.Saudia]: `${t('validations.usernameHelperSaudia')}`,
        [Countries.Egypt]: `${t('validations.usernameHelperEgypt')}`
    }

    const initialFormState = {
        username: '',
        password: '',
    }

    const validations = validationsLoginForm({ t, country: country?.country }) || []
    const { values, isValid, errors, changeHandler, touched } = useForm(initialFormState, validations);

    const handleSetTheme = (country: any) => {
        const theme = AppThemeOptions.find(theme => theme.name === country)
        setAppTheme({
            name: theme.name,
            theme: createTheme({ palette: theme.palette }),

        })
        setCountry({ country })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = { ...values }
        dispatch(loginUserRequest(data))
    };

    useEffect(() => {
        if (!loading && response) {
            const { status, data } = response;
            if (status === APIStatus.Success) {
                const { country } = data;
                //I am changing the theme on both country select and on login response
                handleSetTheme(country)
                navigate('/dashboard')
            }
        }
    }, [response, loading]);


    return (
        <>
            <AppToolbar />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Box style={{ alignSelf:"center"}}>
                            <CustomAvatar src={country?.country ? CountryImages[country?.country] : DefaultValues.CountryImage} alt={country?.country || ""} />
                        </Box>
                        <Typography component="h1" variant="h5" textAlign={"center"}>
                            {t('signIn')}
                        </Typography>
                    </Box>
                    {country &&
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label={t('username')}
                                name="username"
                                autoFocus
                                error={touched.username && Boolean(errors.username)}
                                helperText={country?.country ? countrySpecificUsernameValidationHelper[country?.country] : ''}
                                onChange={(e: any) => changeHandler(e)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('password')}
                                type="password"
                                id="password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={errors.password}
                                onChange={(e: any) => changeHandler(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isValid}
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {t('signIn')}
                            </Button>
                        </Box>
                    }
                    {error && (
                        <Typography variant="body1" mt={4} color={theme.palette.error.main} >
                            {error}
                        </Typography>
                    )}

                </Box>
                <Loader visible={loading} />
            </Container>
        </>
    )
}

export default Login
