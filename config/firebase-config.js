// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY_FIREBASE,
    authDomain: "apnaschool-58679.firebaseapp.com",
    projectId: "apnaschool-58679",
    storageBucket: "apnaschool-58679.appspot.com",
    messagingSenderId: "646768330288",
    appId: "1:646768330288:web:6c95b974fcfd113a21cff5",
    measurementId: "G-DH17J6S7G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app) 