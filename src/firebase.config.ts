import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-VPGty3rBFqa-HV0BjFurml-GX1o5nCQ",
  authDomain: "strong-muscle-37303.firebaseapp.com",
  projectId: "strong-muscle-37303",
  storageBucket: "strong-muscle-37303.firebasestorage.app",
  messagingSenderId: "41272661550",
  appId: "1:41272661550:web:c7fbbee804a9cbe407f1bf",
  measurementId: "G-LL974RYR5W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
