let formSubmit = document.getElementById("formSubmit");
let nameText = document.getElementById("nameText");
let emailText = document.getElementById("emailText");
let password = document.getElementById("passwordText");

formSubmit.addEventListener("submit",function(e){
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      let uid = user.uid;
      db.collection("users").doc(uid).set({
          name: nameText.value,
          email: emailText.value
      }).then(function() {
            console.log("Document successfully written!");
            alert("Đăng ký người dùng " + nameText.value +" thành công !!!");
            window.location.href = "albums.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            alert(error);
        });
    
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  
});
