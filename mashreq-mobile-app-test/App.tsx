/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { setupStore, AppStore } from './src/redux/store'
import i18n from './src/config/i18n'
import AppNavigation from './src/config/AppNavigation'
import { I18nextProvider } from 'react-i18next';
import usePushNotification from './src/hooks/usePushNotification';


function App(): React.JSX.Element {
  const store: AppStore = setupStore()
  const {
    initializeFCMPushNotification,
    requestUserPermission,
    registerAppWithFCM,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();
 
  const listenToNotifications = () => {
    try {
      requestUserPermission();
      initializeFCMPushNotification();
      registerAppWithFCM();
      onNotificationOpenedAppFromQuit();
      listenToBackgroundNotifications();
      listenToForegroundNotifications();
      onNotificationOpenedAppFromBackground();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listenToNotifications();
  }, []);

  
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppNavigation />
      </I18nextProvider>
    </Provider>
  );
}

export default App;
