// File: src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDvJaGFy7-ciP-V5KY3-4yvc13LGgoKask",
  authDomain: "profilepage-36e0c.firebaseapp.com",
  databaseURL: "https://profilepage-36e0c-default-rtdb.firebaseio.com",
  projectId: "profilepage-36e0c",
  storageBucket: "profilepage-36e0c.appspot.com",
  messagingSenderId: "513309932674",
  appId: "1:513309932674:web:3cc45587ed8232454bc89b",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
