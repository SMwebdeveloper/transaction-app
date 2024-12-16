// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC02dHE5tnSJVNmKDzT_zrjO20q2Zq1lbU",
    authDomain: "transaction-app-5931c.firebaseapp.com",
    projectId: "transaction-app-5931c",
    storageBucket: "transaction-app-5931c.firebasestorage.app",
    messagingSenderId: "613721309372",
    appId: "1:613721309372:web:b009e6bc522193897a10b9",
    measurementId: "G-5899F1CQNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)