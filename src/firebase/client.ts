// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgA19VUSZUIVhwpsazBvUeUBeFb7q6JQs",
  authDomain: "iccu-bcca7.firebaseapp.com",
  projectId: "iccu-bcca7",
  storageBucket: "iccu-bcca7.appspot.com",
  messagingSenderId: "182613561285",
  appId: "1:182613561285:web:51358bba14dac7461dc5ac",
  measurementId: "G-NTF8MQ837Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);