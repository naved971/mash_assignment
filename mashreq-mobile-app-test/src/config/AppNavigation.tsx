import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterUser from '../features/registerUser';
import Dashboard from '../features/dashboard';
import * as Routes from './routes';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { theme } = useSelector((state: any) => state.themeReducer);
  const styles = useStyles(theme);

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.BackgroundCore,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={Routes.ROUTE_USER_REGISTRATION} component={RegisterUser} />
            <Stack.Screen name={Routes.ROUTE_USER_DASHBOARD} component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const useStyles = (theme: any) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.BackgroundCore,
    },
  });

export default AppNavigation;
