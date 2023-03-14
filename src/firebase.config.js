// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3MmJfq2jQM7kyPkR1POiGW0lQ2Bhx5tA",
  authDomain: "netflix-clone-9b7ba.firebaseapp.com",
  projectId: "netflix-clone-9b7ba",
  storageBucket: "netflix-clone-9b7ba.appspot.com",
  messagingSenderId: "787055573372",
  appId: "1:787055573372:web:dec014c38e4c5b407b8cf9",
  measurementId: "G-JSJBH6TBYD"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
auth.languageCode = 'it';