// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7PsVP0HuVHKgdUoQnG1xx91H_QFxCiWE",
  authDomain: "log-in-page-bfa67.firebaseapp.com",
  projectId: "log-in-page-bfa67",
  storageBucket: "log-in-page-bfa67.appspot.com",
  messagingSenderId: "378471433412",
  appId: "1:378471433412:web:9729f3be117ab6dca0f591"
};
const firebase = initializeApp(firebaseConfig);
var database = getDatabase(firebase);

//check to see if page is loaded
document.addEventListener("DOMContentLoaded", edvent => {
    
    //sign up page finish button
    var element = document.getElementById("finish_button")

    //check if button exists
    if(element){
        element.addEventListener('click',function(e){
            
            let name = document.getElementById('create_name').value;
            let password = document.getElementById('create_password').value;
            let check_password = document.getElementById('create_checkpassword').value;
            let food = document.getElementById('create_food').value;
            let movie = document.getElementById('create_movie').value;
    
            const itemRef = ref(database, 'users/' + name);
            
            //check if all fields are filled out
            if(name == null || name == "" || password == null || password == "" ||
                check_password == null || check_password == "" ||food == null || food == "" ||
                movie == null || movie == "" )
            {
                alert("Please fill out all fields");
                //check if password matches password check
            } else if (password != check_password){
                alert("Your passwords don't match");
                document.getElementById('create_password').value="";
                document.getElementById('create_checkpassword').value="";
            }else 
            {
                get(itemRef).then((snapshot) => {
                    //check if user already exists
                    if(snapshot.exists()){
                        alert("\""+name+"\" is a user that already exists!");
                    }
                    //create user in database
                    else{
                        set(ref(database, 'users/'+ name),{
                            name: name,
                            password: password,
                            favorite_food: food,
                            disliked_movie: movie
                        }).then(function() {
                            //load main_page
                            window.location.href = "main_page.html"
                        });
                    }
                });
                
            }
            
        });
    }
    

    //log in page submit
    element = document.getElementById("submit_button")
    //check if submit button exists
    if(element){
        element.addEventListener('click',function(e){
            let name = document.getElementById('name_box').value;
            let entered_password = document.getElementById('password_box').value;

            //check to see if user exists in database
            const userRef = ref(database, 'users/'+name+'/password');
            get(userRef).then((snapshot) => {
                if(snapshot.exists()){
                    const password = snapshot.val();
                    //check if password is valid
                    if(entered_password == password){
                        window.location.href = "main_page.html";
                    }else{
                        alert("Your username or password does not match, please try again or sign up.")
                    }
                }else{
                    alert("Your username or password does not match, please try again or sign up.")
                }
            })
        });
    }
    
});

