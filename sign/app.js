const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
// some style will be added to apply the animation when click on the signIn or signUp 
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// this function will activated when click on the signUp button after fill the form
function signUp() {
  // get the input variable value from the form
  let userFullName = document.getElementById("userFullName").value;
  let userEmail = document.getElementById("userEmail").value;
  let userPassword = document.getElementById("userPassword").value;

  // firebase 
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((success) => {
      let user = firebase.auth().currentUser;
      let uid;
      if (user != null) {
        uid = user.uid;
      }
      let firebaseRef = firebase.database().ref();
      let userData = {
        userFullName: userFullName,
        userEmail: userEmail,
        userPassword: userPassword,
      };
      firebaseRef.child(uid).set(userData);
      //this function will be load a pop up with the message below
      // you can use sweetAlert form more information https://sweetalert.js.org/docs/#icon
      swal(
        "Your Account Created",
        "Your account was created successfully, you can log in now."
      ).then((value) => {
        setTimeout(function () {
          
          window.location.replace(""); //this is for the bookmark page link
        }, 1000);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });
}

function signIn() {
  let userSIEmail = document.getElementById("userSIEmail").value;
  let userSIPassword = document.getElementById("userSIPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userSIEmail, userSIPassword)
    .then((success) => {
      swal({
        type: "successfull",
        title: "Succesfully signed in",
      }).then((value) => {
        setTimeout(function () {
          window.location.replace("../index.html"); ////this is also to set after
        }, 1000);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });
}

  let btnUp = document.getElementById("signUp");
  btnUp.addEventListener("click", signUp);
  let btnIn = document.getElementById("signIn");
  btnIn.addEventListener("click", signIn);
