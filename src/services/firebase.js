import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvWsX1VnT30AIoCJ4294_Dd1M7YxUd5ZA",
    authDomain: "media-library-8bcaa.firebaseapp.com",
    databaseURL: "https://media-library-8bcaa.firebaseio.com",
    projectId: "media-library-8bcaa",
    storageBucket: "media-library-8bcaa.appspot.com",
    messagingSenderId: "169585352546",
    appId: "1:169585352546:web:604e5789fad5130058963b"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();