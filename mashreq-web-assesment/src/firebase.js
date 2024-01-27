// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration - you can use your own if you want to test 
const firebaseConfig = {
    apiKey: "AIzaSyBSxaxz2nPWBfnpRE3KRdllGnQKt50dbHM",
    authDomain: "mashreqtestgtl.firebaseapp.com",
    databaseURL: "https://mashreqtestgtl-default-rtdb.firebaseio.com",
    projectId: "mashreqtestgtl",
    storageBucket: "mashreqtestgtl.appspot.com",
    messagingSenderId: "1095088058548",
    appId: "1:1095088058548:web:a15cdaccd38e1d2ba267e1"
  };
  

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const fetchPushMessagesToken = () => {
    //Request permission for notification

    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: 'BDYfpwACXY_Z4G0LLwwgP538uW1MfSRB0dfzyOm-O0ZvEWmZyFeJX_DzJQqbyzZshfSF7QXnH-VSM8wfu56hbqc' }).then((currentToken) => {
                if (currentToken) {
                    // this token you can use on firebase messaging console to generate campaign based
                    // notification for testing
                    console.log('current token for client: ', currentToken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        } else {
            console.log("User Permission Denied.");
        }
    });
}

// FCM cloud messaging listener if App is on Foreground
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });