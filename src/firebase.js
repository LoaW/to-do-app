// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBTUzg2-jLXPot3578EyQijX9sc7O6MuLo",

  authDomain: "my-to-do-app-6995d.firebaseapp.com",

  projectId: "my-to-do-app-6995d",

  storageBucket: "my-to-do-app-6995d.appspot.com",

  messagingSenderId: "728023854212",

  appId: "1:728023854212:web:eaa50d36ca09296fa6e6d1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }; 