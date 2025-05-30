// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBfoPeO5MxuFK1aNva4e2IeyRv_lLL1AU",
  authDomain: "loginsignup-d99d1.firebaseapp.com",
  projectId: "loginsignup-d99d1",
  storageBucket: "loginsignup-d99d1.firebasestorage.app",
  messagingSenderId: "582164301893",
  appId: "1:582164301893:web:e9224b61e9bd732be1fb2c",
  measurementId: "G-F4H0FMQNSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };