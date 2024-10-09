import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-generator-f17f5.firebaseapp.com",
  projectId: "ai-video-generator-f17f5",
  storageBucket: "ai-video-generator-f17f5.appspot.com",
  messagingSenderId: "494088633962",
  appId: "1:494088633962:web:f3f5d26000b65cb4571413",
  measurementId: "G-9B58TTKVDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
