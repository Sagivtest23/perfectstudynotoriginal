import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { signOutUser } from './firebase-config.js';

const firebaseConfig = {
    apiKey: "AIzaSyAycjpbJNEX9aTusrfBhCnR4K22D4h3t3g",
    authDomain: "perfect-study-79812.firebaseapp.com",
    projectId: "perfect-study-79812",
    storageBucket: "perfect-study-79812.firebasestorage.app",
    messagingSenderId: "735903068932",
    appId: "1:735903068932:web:93ab8806dba7d26f5cd651",
    measurementId: "G-WCWFQCZ84C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to update navigation based on auth state
function updateNavigation(user) {
    const navButtons = document.querySelector('.nav-buttons');
    const loginLink = navButtons.querySelector('a[href="login.html"]');
    
    if (user) {
        // User is logged in
        if (loginLink) {
            loginLink.remove(); // Remove login link
        }
        
        // Add user info and logout button
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <span>שלום, ${user.email}</span>
            <button onclick="window.signOut()" class="logout-btn">התנתק</button>
        `;
        navButtons.appendChild(userInfo);
    } else {
        // User is not logged in
        if (!loginLink) {
            const newLoginLink = document.createElement('a');
            newLoginLink.href = 'login.html';
            newLoginLink.textContent = 'התחברות';
            navButtons.appendChild(newLoginLink);
        }
        
        // Remove user info if it exists
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            userInfo.remove();
        }
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    updateNavigation(user);
});

// Make signOut function available globally
window.signOut = async () => {
    try {
        await signOutUser();
        window.location.reload();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}; 