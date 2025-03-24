// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCpIX7zp4qOUACDJUluc6tdNuOj7_fwqtU",
  authDomain: "ecommerce-app-w-firebase.firebaseapp.com",
  projectId: "ecommerce-app-w-firebase",
  storageBucket: "ecommerce-app-w-firebase.firebasestorage.app",
  messagingSenderId: "328229202458",
  appId: "1:328229202458:web:1cf0ad6b57b0e6aa8abfa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);