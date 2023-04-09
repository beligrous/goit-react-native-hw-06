// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRlYnoM9vzAvDg-mCIhSmiJqwOA0MzLDY",
  authDomain: "react-native-hw-edb52.firebaseapp.com",
  projectId: "react-native-hw-edb52",
  storageBucket: "react-native-hw-edb52.appspot.com",
  messagingSenderId: "197140504825",
  appId: "1:197140504825:web:6abb13eecade10819b0228",
  measurementId: "G-13Z4PEEYE3",
  databaseURL:
    "https://react-native-hw-edb52-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
