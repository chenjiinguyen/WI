let dangkyBtn = document.getElementById("dangkyBtn");
let name = document.getElementById("nameText");
let email = document.getElementById("emailText");
let password = document.getElementById("passwordText");

dangkyBtn.addEventListener("click",function(e){
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      let uid = user.uid;
      db.collection("users").doc(uid).set({
          name: name.value,
          email: email.value
      }).then(function() {
            console.log("Document successfully written!");
            alert("Đăng ký người dùng " + name.value +" thành công !!!");
            window.location.href = "chat.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            alert(error);
        });
    
    })
    .catch((error) => {
        console.log("AÁABBBB")
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  
});
