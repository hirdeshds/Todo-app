// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqkppDmR6Fdqi2v4Ukt4x51f3iQzUsWOs",
  authDomain: "todo-list-b4b2c.firebaseapp.com",
  projectId: "todo-list-b4b2c",
  storageBucket: "todo-list-b4b2c.firebasestorage.app",
  messagingSenderId: "822653273209",
  appId: "1:822653273209:web:08f906d3ce3ced849b00a8",
  measurementId: "G-N9MKC9GCF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };