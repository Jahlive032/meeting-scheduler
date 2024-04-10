// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studing-146c5.firebaseapp.com",
  projectId: "studing-146c5",
  storageBucket: "studing-146c5.appspot.com",
  messagingSenderId: "664610640443",
  appId: "1:664610640443:web:f0379af86b856ea686421e",
  measurementId: "G-1297QMHK9G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
