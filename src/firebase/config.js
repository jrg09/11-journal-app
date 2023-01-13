// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2AKKB1himoSo0yxUntzrG8Y6QYj2o8jw",
  authDomain: "react-cursos-b4702.firebaseapp.com",
  projectId: "react-cursos-b4702",
  storageBucket: "react-cursos-b4702.appspot.com",
  messagingSenderId: "612059492276",
  appId: "1:612059492276:web:38f2ac9b5841cd4e564ce1",
  measurementId: "G-K3Z5Z890GS",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
