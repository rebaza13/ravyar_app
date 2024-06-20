// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHqqkg9dSsxiAsuFpfEO84y1VvV6nzQwA",
  authDomain: "dietbase-c8666.firebaseapp.com",
  projectId: "dietbase-c8666",
  storageBucket: "dietbase-c8666.appspot.com",
  messagingSenderId: "176825986454",
  appId: "1:176825986454:web:459c6163abcb490415c1b7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth(firebaseApp)

