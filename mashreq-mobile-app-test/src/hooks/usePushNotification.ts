import React from 'react';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

const RNfirebaseConfig:any = {
  apiKey: "AIzaSyCAecATTv0LZUOYlz8jdERZ6EyUBFpDO3o",
  authDomain: "mashreqtestgtl.firebaseapp.com",
  projectId: "mashreqtestgtl",
  databaseURL: 'https://mashreqtestgtl-default-rtdb.firebaseio.com/',
  storageBucket: "mashreqtestgtl.appspot.com",
  messagingSenderId: "1095088058548",
  appId: Platform.select({ ios: "1:1095088058548:ios:e6338b8b873b80cea267e1", android: "1:1095088058548:android:84e80504a6a7ed87a267e1" })
};

const usePushNotification = () => {

  const initializeFCMPushNotification = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(RNfirebaseConfig);
    }
  }

  const registerAppWithFCM = async () => {
    try {
      if (Platform.OS === 'ios') {
        const registerFCM: any = await messaging().registerDeviceForRemoteMessages();
        console.log('Register status:', registerFCM);
        if (registerFCM) {
          const fcmToken = await getFCMToken();
          if(fcmToken){
            
          }
          console.log('Register Fcm  status & fcmToken :', {
            registerFCM,
            fcmToken
          });
          //messaging().setAPNSToken(fcmToken)
        }

      } else if (Platform.OS === 'android') {
        getFCMToken();
      }
    } catch (error) {
    }

  }

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {

      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      return fcmToken;
    } else {
      
      console.log('Failed', 'No token received');
      return -1
    }
  };

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'A new message arrived! (FOREGROUND)',
        JSON.stringify(remoteMessage),
      );
      const { notification, data } = remoteMessage;

      const channelId = await notifee.createChannel({
        id: `${remoteMessage.sentTime}` + Math.random(),
        name: `${remoteMessage.sentTime}` + Math.random(),
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
        },
      });

    });
    return unsubscribe;
  }

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  }

  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log(
          'App opened from BACKGROUND by tapping notification:',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();

    if (message) {
      console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
    }
  };

  return {
    initializeFCMPushNotification,
    requestUserPermission,
    registerAppWithFCM,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;