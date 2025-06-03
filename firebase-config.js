// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAycjpbJNEX9aTusrfBhCnR4K22D4h3t3g",
    authDomain: "perfect-study-79812.firebaseapp.com",
    projectId: "perfect-study-79812",
    storageBucket: "perfect-study-79812.firebasestorage.app",
    messagingSenderId: "735903068932",
    appId: "1:735903068932:web:93ab8806dba7d26f5cd651",
    measurementId: "G-WCWFQCZ84C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Only initialize analytics if we're not in a development environment
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const analytics = getAnalytics(app);
}

// Sign up function
export async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign in function
export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign out function
export async function signOutUser() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
} 