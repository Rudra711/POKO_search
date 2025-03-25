import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAQjEkCHNeQxgSox6YL-Y0MvbCDhY28xrc",
    authDomain: "pokosearch.firebaseapp.com",
    projectId: "pokosearch",
    storageBucket: "pokosearch.firebasestorage.app",
    messagingSenderId: "453218361165",
    appId: "1:453218361165:web:3d3315917ee936a3cda104",
    measurementId: "G-GWBVZWJ9CB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();
const db = getFirestore(app); // Firestore Database
const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("GitHub Auth Error:", error);
  }
};

const logout = async () => {
  await signOut(auth);
};

export { db, auth, signInWithGitHub, logout };
