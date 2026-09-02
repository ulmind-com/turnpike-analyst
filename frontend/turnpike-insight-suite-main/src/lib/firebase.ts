import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxwkhQZPQ0PRfI3u7P7LXQSFUTIy2Y6Bs",
  authDomain: "turnpike-fad7d.firebaseapp.com",
  projectId: "turnpike-fad7d",
  storageBucket: "turnpike-fad7d.firebasestorage.app",
  messagingSenderId: "408001212232",
  appId: "1:408001212232:web:72b2537dc86a1f15530d7d",
  measurementId: "G-ZDE1N7PEBZ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
