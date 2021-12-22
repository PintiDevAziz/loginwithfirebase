import { initializeApp } from "firebase/app";
//! Auth

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjc1J_AjfV2PNAbXQW4x-a3n5bx39-YEA",
  authDomain: "music-app-cb318.firebaseapp.com",
  projectId: "music-app-cb318",
  storageBucket: "music-app-cb318.appspot.com",
  messagingSenderId: "683587354088",
  appId: "1:683587354088:web:a0196b45e0f7abd165385d",
  measurementId: "G-RSSWQ6PN3S",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
