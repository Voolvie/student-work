import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import admin from "firebase-admin"
import serviceAccount from "../src/klemczak-library-firebase-adminsdk-bnonr-9d8533fbfc.json"
import { getAuth } from "firebase/auth";


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

});

const config = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,

  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

}


const app = firebase.initializeApp(config)

export const auth = app.auth()

export default app

export const db = firebase.firestore()

export const isAuth = firebase.auth()

export const storage = firebase.storage()

