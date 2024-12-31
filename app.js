// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
         

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google Auth Provider
const db = getFirestore(app); // Firestore initialization

// DOM Elements
const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");
const accountLogo = document.getElementById("account-logo");
const userLogo = document.getElementById("user-logo");
const logoutBtn = document.getElementById("logout-btn");
const googleSigninBtn = document.getElementById("google-signin-btn");

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    showLoginBtn.style.display = "none"; // Hide login button
    showSignupBtn.style.display = "none"; // Hide signup button
    accountLogo.style.display = "block"; // Show account logo

    // Set user logo (user's avatar or a default image)
    if (user.photoURL) {
      userLogo.src = user.photoURL;
    } else {
      userLogo.src = "path_to_default_avatar.png"; // Set a default avatar if no photoURL
    }
  } else {
    // User is logged out
    showLoginBtn.style.display = "block"; // Show login button
    showSignupBtn.style.display = "block"; // Show signup button
    accountLogo.style.display = "none"; // Hide account logo
  }
});

// Signup Form Submission
const signupForm = document.getElementById("signup-form-content");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account created successfully!");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Login Form Submission
const loginForm = document.getElementById("login-form-content");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Logout function
logoutBtn.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      console.log("User signed out!");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
});

// Google Sign-In function
googleSigninBtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user; // The signed-in user info
      console.log("Google Sign-In Successful:", user);
      alert(`Welcome ${user.displayName}!`);
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error);
      alert("Google Sign-In failed. Please try again.");
    });
});












  