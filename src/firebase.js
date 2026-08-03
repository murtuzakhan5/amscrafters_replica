import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJwKC_Gqn7gBzQVOebu_d8S3p9R90YHT8",
  authDomain: "amscrafters-922a1.firebaseapp.com",
  projectId: "amscrafters-922a1",
  storageBucket: "amscrafters-922a1.firebasestorage.app",
  messagingSenderId: "152548439532",
  appId: "1:152548439532:web:ccf3dda889ef6828f4bcc9",
  measurementId: "G-KYPFX43101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
