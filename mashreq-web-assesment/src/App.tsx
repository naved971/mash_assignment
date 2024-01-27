import React, { useState } from 'react';
import { AppThemeContext, AppTheme, CountryTheme, defaultAppTheme, defaultCountry, CountryThemeContext } from './themes/AppTheme';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next'
import i18n from './config/i18n'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes';
import { Provider } from 'react-redux'
import store from './redux/store'
import Notification from '../src/features/Notification'

// Main App file with all the providers

function App() {

  const [appTheme, setAppTheme] = useState<AppTheme>(defaultAppTheme)
  const [country, setCountry] = useState<CountryTheme>(defaultCountry)

  return (
    <AppThemeContext.Provider value={{ appTheme: appTheme, setAppTheme }}>
      <CountryThemeContext.Provider value={{ country, setCountry }}>

        <ThemeProvider theme={appTheme?.theme}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <CssBaseline />
              <RouterProvider router={router} />
              <Notification />
            </I18nextProvider>
          </Provider>
        </ThemeProvider>
      </CountryThemeContext.Provider>
    </AppThemeContext.Provider>
  );
}

export default App;
