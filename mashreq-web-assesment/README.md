
# Mashreq Web Assement

 * Login Form for Authentication Username and Password
 * Theme change is both on after login and even on country select.
 * Use Material UI latest version 
 * Theming is based on the country, and with Material UI provide
 * Theme is getting handle by React Context
 * Axios is getting use for API call
 * Redux saga for state managment
 * React testing library/Jest for testing
 * React routing v6 (latest) for routing
 * For push notification, Firebase Cloud messaging is implemented. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\
I have done the setting of react testing library with jest, you can see that in code

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Firebase config

Create firebase project on https://console.firebase.google.com/u/0/ .
Change it with your own configuration

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBZZImaYn3SARaWasR1wo_2o7cXcLGMf1I",
    authDomain: "mashreq-web-push.firebaseapp.com",
    projectId: "mashreq-web-push",
    storageBucket: "mashreq-web-push.appspot.com",
    messagingSenderId: "505157567702",
    appId: "1:505157567702:web:510ccca718afb3f25bb577",
    measurementId: "G-52Z4M7CWHK"
};

```

Change vapidKey with Web Push certificates key on Firebase console

```javascript
 Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: 'your key' }).then((currentToken) => {
                if (currentToken) {
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

```

## For testing FCM Notification 

Ensure you copy the generated Client Token from console. To test Cloud Messaging in your Firebase project, navigate to your application dashboard and click the Cloud Messaging tab under the Grow & engage your audience section. Click Create your first campaign, select Firebase Notification messages, and compose a notification