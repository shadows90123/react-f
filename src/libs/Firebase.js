import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrpJ5S7qkpTHk38BEu9y0GKDL4ChTKDAA",
    authDomain: "react-f-b9ab0.firebaseapp.com",
    projectId: "react-f-b9ab0",
    storageBucket: "react-f-b9ab0.appspot.com",
    messagingSenderId: "37794414436",
    appId: "1:37794414436:web:53b4ca53acb3bfad308471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const logOut = async () => {
    signOut(auth);
};

export const loginWithPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const registerWithPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.error(error);
        });
};
