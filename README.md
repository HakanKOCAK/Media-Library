# Media Library
An application to edit/display submissions, which includes a file (video, audio, image or other) and tags, made to a specific form created on JotForm.

## Usage
To install the dependencies
`yarn install` 

To start the application
`yarn start`

## Config
Please add your JotForm api key and the form id to the config file which can be found in /src/config/config.js

```
export const apiKey = 'YOUR API KEY';
export const formId = 'YOUR FORM ID';
```

You must clone the form from the url https://www.jotform.com/201612315053945
If you dont know how to clone an existing form https://www.jotform.com/help/42-How-to-Clone-an-Existing-Form-from-a-URL

Please add your firebase configuration for authentication to firebase.js file which can be found in /src/services/firebase.js

```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR AUTH DOMAIN',
  databaseURL: 'YOUR DATABASE URL',
  projectId: 'YOUR PROJECT ID',
  storageBucket: 'YOUR STORAGE BUCKET',
  messagingSenderId: 'YOUR MESSAGING SENDER ID',
  appId: 'YOUR APP ID',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth;

```

Demo page: https://media-library-demo-app.herokuapp.com/



