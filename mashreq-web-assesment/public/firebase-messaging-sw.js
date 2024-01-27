// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBSxaxz2nPWBfnpRE3KRdllGnQKt50dbHM",
  authDomain: "mashreqtestgtl.firebaseapp.com",
  databaseURL: "https://mashreqtestgtl-default-rtdb.firebaseio.com",
  projectId: "mashreqtestgtl",
  storageBucket: "mashreqtestgtl.appspot.com",
  messagingSenderId: "1095088058548",
  appId: "1:1095088058548:web:a15cdaccd38e1d2ba267e1"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// Retrieve firebase background messaging listner

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
