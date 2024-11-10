// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHJEFpjO8x2l7RNf1yQmMuwiedI5MKDhQ",
  authDomain: "email-password-auth-9da88.firebaseapp.com",
  projectId: "email-password-auth-9da88",
  storageBucket: "email-password-auth-9da88.firebasestorage.app",
  messagingSenderId: "957436727403",
  appId: "1:957436727403:web:fdce4ff90409702a8de12e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);