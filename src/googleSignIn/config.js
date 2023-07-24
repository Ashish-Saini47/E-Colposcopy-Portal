// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu0ul3EDU8sZTIaWwZrDo21A-s9qdzTTo",
  authDomain: "colposcopy-patient-dashboard.firebaseapp.com",
  databaseURL: "https://colposcopy-patient-dashboard-default-rtdb.firebaseio.com",
  projectId: "colposcopy-patient-dashboard",
  storageBucket: "colposcopy-patient-dashboard.appspot.com",
  messagingSenderId: "293369251942",
  appId: "1:293369251942:web:a19e6154a60f077edd45a7",
  measurementId: "G-D6134C5FHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider(); 
const db = getDatabase(app);
export {auth, provider, db, storage}
