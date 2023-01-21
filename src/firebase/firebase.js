// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXc_Mark8ZbvfkDSYUGFuuwTTmjZQfpRo",
    authDomain: "moviehub-8b44f.firebaseapp.com",
    projectId: "moviehub-8b44f",
    storageBucket: "moviehub-8b44f.appspot.com",
    messagingSenderId: "945124269073",
    appId: "1:945124269073:web:837989804c0106c64ea5b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db, "Movies")
export const reviewsRef = collection(db, "Reviews")

export default app;