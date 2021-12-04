// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTsYRVzGdspNGFIDB8rBFtXiX6s3CrI4I",
  authDomain: "myjourneys-75706.firebaseapp.com",
  projectId: "myjourneys-75706",
  storageBucket: "myjourneys-75706.appspot.com",
  messagingSenderId: "488791259704",
  appId: "1:488791259704:web:62e9ae43f432dbd36f84cd",
  measurementId: "G-8G5ZJHJP52",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);