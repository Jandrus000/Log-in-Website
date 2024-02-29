// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7PsVP0HuVHKgdUoQnG1xx91H_QFxCiWE",
  authDomain: "log-in-page-bfa67.firebaseapp.com",
  projectId: "log-in-page-bfa67",
  storageBucket: "log-in-page-bfa67.appspot.com",
  messagingSenderId: "378471433412",
  appId: "1:378471433412:web:9729f3be117ab6dca0f591"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



document.addEventListener("DOMContentLoaded", edvent => {
    document.getElementById("name_submit").addEventListener('click',function(e){
        set(ref(db, '/user',document.getElementById('name_box').value),
        {
            name: document.getElementById('name_box').value
        })
        alert("log-in success");
    });
});

