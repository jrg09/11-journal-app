// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "./getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = getEnvironments();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//config de producción:
// const firebaseConfig = {
//   apiKey: "AIzaSyD2AKKB1himoSo0yxUntzrG8Y6QYj2o8jw",
//   authDomain: "react-cursos-b4702.firebaseapp.com",
//   projectId: "react-cursos-b4702",
//   storageBucket: "react-cursos-b4702.appspot.com",
//   messagingSenderId: "612059492276",
//   appId: "1:612059492276:web:38f2ac9b5841cd4e564ce1",
//   measurementId: "G-K3Z5Z890GS",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyBjRocwYwXvht8vGIFZMB-yJCVkJuyCrKA",
//   authDomain: "react-cursos-testing-70a35.firebaseapp.com",
//   projectId: "react-cursos-testing-70a35",
//   storageBucket: "react-cursos-testing-70a35.appspot.com",
//   messagingSenderId: "169169455038",
//   appId: "1:169169455038:web:ccaf24194a036ebeac1bef",
// };
const firebaseConfig = {
  apiKey: env.VITE_APIKEY,
  authDomain: env.VITE_AUTHDOMAIN,
  projectId: env.VITE_PROJECTID,
  storageBucket: env.VITE_STORAGEBUCKET,
  messagingSenderId: env.VITE_MESSAGINGSENDERID,
  appId: env.VITE_AAPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
