// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6enV_GNoToiH8CQNNejhCbGI8fQE6jN4",
  authDomain: "internetstore-92c92.firebaseapp.com",
  databaseURL: "https://internetstore-92c92-default-rtdb.firebaseio.com",
  projectId: "internetstore-92c92",
  storageBucket: "internetstore-92c92.appspot.com",
  messagingSenderId: "183474240834",
  appId: "1:183474240834:web:a656d2c3e418ed00135cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)