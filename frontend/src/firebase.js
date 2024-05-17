// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-boxy2q6UfRUv8Yse3Ghap2vTVAwsrRM",
    authDomain: "quora-clone-fe787.firebaseapp.com",
    projectId: "quora-clone-fe787",
    storageBucket: "quora-clone-fe787.appspot.com",
    messagingSenderId: "491993095557",
    appId: "1:491993095557:web:fe5b7c6d337bf438ee78ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider}