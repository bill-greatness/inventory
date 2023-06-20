import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATT25P68KE9bmDlg3nZicgYiwCGHEKNfA",
  authDomain: "test-66c8d.firebaseapp.com",
  databaseURL: "https://test-66c8d.firebaseio.com",
  projectId: "test-66c8d",
  storageBucket: "test-66c8d.appspot.com",
  messagingSenderId: "531127962891",
  appId: "1:531127962891:web:802b338bd2f3c9f7d3660e",
  measurementId: "G-Z8G4JEM3H3"
};

const app = initializeApp(firebaseConfig);
export const store = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)