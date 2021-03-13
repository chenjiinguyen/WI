auth.onAuthStateChanged(function(user) {
    if (user) {
        let nameUser = document.getElementById("nameUser");
        let cardUser = document.getElementById("cardUser");
        let uid = user.uid;
        db.collection("users").doc(uid).get().then((doc) => {
            nameUser.innerHTML = doc.data().name;
            cardUser.innerHTML = "Album of "+ doc.data().name;
        })
        // .orderBy("uploadedAt")
        db.collection("album").where("author", "==", uid).get().then((snapshot) => {
            let listAlbum = document.getElementById("listAlbum");
            listAlbum.innerHTML = "";
            albumListString = "";
            snapshot.forEach((doc) => {
                albumListString += `<div class="card m-2"  style="width:300px">
                <img src="${doc.data().url}"  alt="${doc.data().description}" class="card-img-top img-fluid">
                <div class="card-body">
                  <h5 class="card-title">${doc.data().name}</h5>
                  <p class="card-text">${doc.data().description}</p>
                  <a href="#" class="btn btn-primary">${doc.data().uploadedAt.toDate().toLocaleTimeString('en-US')} </a>
                </div></div>`
                
            })
            listAlbum.innerHTML = albumListString;
        })
    }else{ 
        window.location.href = "login.html";
    }
})



////


let uploadImageForm = document.getElementById("uploadImageForm");
let nameImage = document.getElementById("nameImage");
let descriptionImage = document.getElementById("descriptionImage");
let storageRef = storage.ref();
uploadImageForm.addEventListener("submit", function(e){
    e.preventDefault();
    auth.onAuthStateChanged(function(user) {
        if (user) {
                const selectedFile = document.getElementById('upload').files[0];
                imagesRef = storageRef.child('albums/'+user.uid+'/'+selectedFile.name);
                imagesRef.put(selectedFile).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    imagesRef.getDownloadURL()
                    .then((url) => {
                        db.collection("album").add({
                            name: nameImage.value,
                            description : descriptionImage.value,
                            url: url,
                            author: user.uid,
                            uploadedAt : firebase.firestore.FieldValue.serverTimestamp() ,
                        }).then((docRef) => {
                            alert("Upload Thành Công");
                        }).catch((err)=>{
                            console.log("X" + err.message);
                        })
                           
                       
                    })
                    .catch((error) => {
                    // Handle any errors
                    console.log("y" + error.message);
                    });
                
                });
            }
        });
})