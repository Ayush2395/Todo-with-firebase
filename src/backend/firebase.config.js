import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SEDNER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBqqf5vQU2i-k9UxR0IHMALqiVHBmNFNRM",
//   authDomain: "test-79db6.firebaseapp.com",
//   projectId: "test-79db6",
//   storageBucket: "test-79db6.appspot.com",
//   messagingSenderId: "822398178028",
//   appId: "1:822398178028:web:4b98b081e48e5b48540bc9",
//   measurementId: "G-38FZP3Z2NF",
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
