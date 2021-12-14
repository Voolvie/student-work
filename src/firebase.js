import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore';



const app = firebase.initializeApp({
  apiKey: "AIzaSyAqQg34sv3Luiz1DB8xkEfqu3r9nYUUG88",

  authDomain: "klemczak-library.firebaseapp.com",

  projectId: "klemczak-library",

  storageBucket: "klemczak-library.appspot.com",

  messagingSenderId: "783224823419",

  appId: "1:783224823419:web:953095dcde25278d958cde",

  measurementId: "G-7GPH5K9Y6W"


})

export const auth = app.auth()

export default app

export const db = firebase.firestore()

export const isAuth = firebase.auth()

