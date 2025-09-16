import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDu6tbrbE60pN_x4ggYrBNFMGX_psmvi3c",
    authDomain: "e-learning-5e805.firebaseapp.com",
    projectId: "e-learning-5e805",
    storageBucket: "e-learning-5e805.firebasestorage.app",
    messagingSenderId: "797294355621",
    appId: "1:797294355621:web:eb551fe01a5d2acda7994c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

