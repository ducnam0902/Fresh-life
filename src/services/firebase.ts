// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkI-gNSD4mRyS-nGUCfGMBekNQ-IBz8Ek",
  authDomain: "freshlife-6f891.firebaseapp.com",
  projectId: "freshlife-6f891",
  storageBucket: "freshlife-6f891.firebasestorage.app",
  messagingSenderId: "968533287305",
  appId: "1:968533287305:web:6a331b71f5e84815fa4158",
  measurementId: "G-G4W2VS0XPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default app;
export { analytics, auth };