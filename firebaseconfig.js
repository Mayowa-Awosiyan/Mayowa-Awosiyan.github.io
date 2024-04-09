//add the firebase database connection
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzwu_V4Il8u6etVXtRNv1iV9qDthhAMPw",

  authDomain: "suave-developlment.firebaseapp.com",

  databaseURL: "https://suave-developlment-default-rtdb.firebaseio.com",

  projectId: "suave-developlment",

  storageBucket: "suave-developlment.appspot.com",

  messagingSenderId: "1023416661424",

  appId: "1:1023416661424:web:c6458ee3f9c7780e991275",

  measurementId: "G-F2PQRE8XGH",
};

export const app = initializeApp(firebaseConfig);
