import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGb2fXSyly3OVQnri-jt2cHI2BZ9Svq80",
  authDomain: "gm-web-site.firebaseapp.com",
  projectId: "gm-web-site",
  storageBucket: "gm-web-site.firebasestorage.app",
  messagingSenderId: "190446162746",
  appId: "1:190446162746:web:c7b7dca0a8acc3c81f7603",
  measurementId: "G-MKHHW7RN8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
