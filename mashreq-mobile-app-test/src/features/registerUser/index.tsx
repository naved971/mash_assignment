import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocation ,faLanguage} from '@fortawesome/free-solid-svg-icons';
import Button, { SimpleButton } from '../../components/Button';
import { useTheme } from 'styled-components';
import { setLanguage, setKeyStore } from '../../config/utils';
import { changeAppTheme } from '../../redux/actions/themeActions';
import CountriesModal from '../../components/CountriesModal';
import LanguagesModal from '../../components/LanguagesModal';
import SmartInput from '../../components/SmartInput';
import useForm from '../../hooks/useForm';
import { validationsLoginForm } from '../../config/validations';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_USER_DASHBOARD } from '../../config/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text, { fontVariant } from '../../components/Text';
import { useSelector, useDispatch } from 'react-redux';
import { registerUserRequest } from '../../redux/actions/userRegistrationActions';
import LoadingOverlay from '../../components/LoadingOverlay';
import { APIStatus, Countries, CountryImages, USERNAME_KEY } from '../../config/constants';

interface RegisterUserProps { }
const width = Dimensions.get('window').width;

const getStyles = () =>
    StyleSheet.create({
        rootContainer: {
            flex: 1,
            paddingHorizontal: 22,
        },
        topSection: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 22,
        },
        countySelectContainer: {},
        languageBtnContainer: {},
        languageBtnTextContainer: {
            marginLeft: 6,
        },
        titleContainer: {
            alignItems: 'center',
        },
        countryImage: {
            width: 32,
            height: 32,
            resizeMode: 'contain',
            marginHorizontal: 6,
        },
    });

const RegisterUser: React.FC<RegisterUserProps> = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [languageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
    const [countriesModalVisible, setCountriesModalVisible] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const styles = getStyles();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch();

    const countrySpecificUsernameValidationHelper: any = {
        [Countries.UAE]: `${t('validations.usernameHelperUAE')}`,
        [Countries.India]: `${t('validations.usernameHelperIndia')}`,
        [Countries.Egypt]: `${t('validations.usernameHelperEgypt')}`,
        [Countries.Saudia]: `${t('validations.usernameHelperSaudia')}`,
    };

    const initialFormState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    };

    const {
        response,
        loading,
        error,
    } = useSelector((state: any) => state.userRegistration);

    const validations = validationsLoginForm({ t, country }) || [];
    const { values, isValid, errors, changeHandler, touched, setValues, setValid, setErrors } =
        useForm(initialFormState, validations);

    useEffect(() => {
        resetForm();
    }, [i18n.language]);

    useEffect(() => {
        if (!loading && response) {
            const { status } = response;
            if (status === APIStatus.Success) {
                onSaveUsername(values.username);
                navigation.navigate(ROUTE_USER_DASHBOARD);
            }
        }
    }, [response, loading]);

    const resetForm = () => {
        setValues(initialFormState);
        setValid(false);
        setErrors({});
    };

    const onOpenLanguageModal = () => {
        setLanguageModalVisible(true);
    };

    const onOpenCountryModal = () => {
        setCountriesModalVisible(true);
    };

    const onLanguageSelect = (item: string) => {
        setLanguage(item);
        setLanguageModalVisible(false);
    };

    const onSaveUsername = async (username: string) => {
        try {
            await setKeyStore(USERNAME_KEY, username);
        } catch (error) {
            console.error('Error saving username:', error);
        }
    };

    const onCountrySelect = (item: string) => {
        dispatch(changeAppTheme(item));
        setCountriesModalVisible(false);
        setCountry(item);
        resetForm();
    };

    const renderLanguage = () => {
        return <LanguagesModal {...{ languageModalVisible, setLanguageModalVisible, onLanguageSelect }} />;
    };

    const renderCountries = () => {
        return <CountriesModal {...{ countriesModalVisible, setCountriesModalVisible, onCountrySelect }} />;
    };

    const onSubmitForm = () => {
        dispatch(registerUserRequest({ country, ...values }));
    };

    return (
        <View style={styles.rootContainer}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <View style={styles.countySelectContainer}>
                        <SimpleButton onPress={() => onOpenCountryModal()} activeOpacity={0.7} testID="selectContainer">
                            {
                                country ? (
                                    <Image source={CountryImages[country]} style={styles.countryImage} />
                                ) : (
                                    <FontAwesomeIcon size={24} icon={faLocation} />
                                )
                            }
                            <View style={styles.languageBtnTextContainer}>
                                <Text color={theme.CoreChroma} variant={fontVariant.subtitle1}>
                                    {country ? country : t('chooseCountry')}
                                </Text>
                            </View>
                        </SimpleButton>
                    </View>
                    <View style={styles.languageBtnContainer}>
                        <SimpleButton onPress={() => onOpenLanguageModal()} activeOpacity={0.7} testID="languageButton">
                            <FontAwesomeIcon icon={faLanguage} color={theme.CoreChroma} size={32} />
                            <View style={styles.languageBtnTextContainer}>
                                <Text color={theme.CoreChroma} variant={fontVariant.subtitle1}>
                                    {i18n.language.toUpperCase()}
                                </Text>
                            </View>
                        </SimpleButton>
                    </View>
                </View>

                <View>
                    {country && (
                        <>
                            <View style={styles.titleContainer}>
                                <Text color={theme.CoreChroma} variant={fontVariant.h3}>
                                    {t('title', { country })}
                                </Text>
                            </View>

                            <SmartInput
                                value={values?.username}
                                onChangeText={(value: string) => changeHandler({ name: 'username', value })}
                                placeholder={t('username')}
                                helperText={country ? countrySpecificUsernameValidationHelper[country] : ''}
                                error={touched.username && errors.username}
                                maxLength={16}
                                testID="username"
                            />
                            <SmartInput
                                value={values?.password}
                                onChangeText={(value: string) => changeHandler({ name: 'password', value })}
                                placeholder={t('password')}
                                error={touched.password && errors.password}
                                maxLength={16}
                                secureTextEntry={true}
                                testID="password"
                            />
                            <SmartInput
                                value={values?.firstName}
                                onChangeText={(value: string) => changeHandler({ name: 'firstName', value })}
                                placeholder={t('firstName')}
                                error={touched.firstName && errors.firstName}
                                maxLength={16}
                                testID="firstName"
                            />
                            <SmartInput
                                value={values?.lastName}
                                onChangeText={(value: string) => changeHandler({ name: 'lastName', value })}
                                placeholder={t('lastName')}
                                error={touched.lastName && errors.lastName}
                                maxLength={16}
                                testID="lastName"
                            />
                              <SmartInput
                                value={values?.age}
                                onChangeText={(value: string) => changeHandler({ name: 'age', value })}
                                placeholder={t('age')}
                                error={touched.age && errors.age}
                                maxLength={3}
                                testID="age"
                            />
                        </>
                    )}
                    {error && <Text color={theme.ErrorTextAlert} variant={fontVariant.body2}>*{error}</Text>}
                </View>
            </KeyboardAwareScrollView>
            <View>
                {country && (
                    <Button
                        disabled={!isValid}
                        onPress={() => onSubmitForm()}
                        title={t('register')}
                        testID="registerButton"
                    />
                )}
            </View>
            {languageModalVisible && renderLanguage()}
            {countriesModalVisible && renderCountries()}
            {loading && <LoadingOverlay />}
        </View>
    );
};

export default RegisterUser;
