// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASxdnImpL8qBlFdA-jXQU3R-XMEx3xCLo",
  authDomain: "insta0-2yt.firebaseapp.com",
  projectId: "insta0-2yt",
  storageBucket: "insta0-2yt.appspot.com",
  messagingSenderId: "718246428396",
  appId: "1:718246428396:web:46486a1a1fcd0717b96fc9",
  measurementId: "G-C0KE9822K4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);
const storage = getStorage();

export { db, storage };



