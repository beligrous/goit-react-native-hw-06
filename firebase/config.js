// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

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
const db = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(db);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(db);
