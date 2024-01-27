import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image } from 'react-native';
import Text, { fontVariant } from '../../components/Text';
import { getKeyStore, deleteKeyStore } from '../../config/utils';
import { CountryImages, USERNAME_KEY } from '../../config/constants';
import Button, { SimpleButton } from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { useTheme } from 'styled-components';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { clearRegisterUser } from '../../redux/actions/userRegistrationActions';
import { ROUTE_USER_REGISTRATION } from '../../config/routes';

const Dashboard: React.FC<any> = (): JSX.Element => {
  const { t } = useTranslation();
  const styles = getStyles();
  const [username, setUsername] = useState<string | null>(null);
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUsername();
  }, []);

  const { response } = useSelector((state: any) => state.userRegistration);
  const { country, firstName, lastName } = response.data;

  const loadUsername = async () => {
    try {
      const storedUsername = await getKeyStore(USERNAME_KEY);
      setUsername(storedUsername);
    } catch (error) {
      console.error('Error loading username:', error);
    }
  };

  const handleDeleteUsername = async () => {
    try {
      await deleteKeyStore(USERNAME_KEY);
      setUsername(null);
    } catch (error) {
      console.error('Error deleting username:', error);
    }
  };

  const navigateToInitialRoute = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTE_USER_REGISTRATION }],
      })
    );
  };

  const logOut = () => {
    dispatch(clearRegisterUser());
    handleDeleteUsername();
    navigateToInitialRoute();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.topSection}>
        <SimpleButton activeOpacity={0.7}>
        {country ? <Image source={CountryImages[country]} style={styles.countryImage} /> : <FontAwesomeIcon icon={faCircleUser} color={theme.CoreChroma} size={72} />}

          
          <View style={styles.usernameContainer}>
            <Text variant={fontVariant.h4}>{`${t('welcome')} ${username}!`}</Text>
            <View style={styles.usernameInfoContainer}>
              <Text variant={fontVariant.body2}>{`${firstName} ${lastName}`}</Text>
              <Text variant={fontVariant.captionBold} color={theme.CoreChroma}>
                {country}
              </Text>
            </View>
          </View>
        </SimpleButton>
      </View>
      <View>
        <Button onPress={logOut} title={t('logOut')} testID="logOut" />
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      padding: 22,
    },
    topSection: {
      flex: 1,
    },
    usernameContainer: {
      marginLeft: 6,
    },
    usernameInfoContainer: {
      marginTop: 8,
    },
    countryImage: {
        width: 72,
        height: 72,
        resizeMode: 'contain',
        marginHorizontal: 6,
    },
  });

export default Dashboard;
