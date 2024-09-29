// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCqxaZ3tm2iztHk2O7DI61iBucwPB8WjDk",
  authDomain: "quickconnect78.firebaseapp.com",
  projectId: "quickconnect78",
  storageBucket: "quickconnect78.appspot.com",
  messagingSenderId: "330720668177",
  appId: "1:330720668177:web:60dab30df572172b9d1fb0",
  measurementId: "G-3XWQP9E0DB"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();