// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAAzKjwo_FCN8u1OzSMzDwS_vZHLAbwT1c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "auth-57548.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "auth-57548",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "auth-57548.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "318573080202",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:318573080202:web:09bb4a6695920da1180773"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;