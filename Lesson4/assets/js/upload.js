// Create a root reference
let storageRef = storage.ref();
var metadata = {
    contentType: 'image/png',
};
let uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click",function(){
    // let processbar = document.getElementById("process");
    // processbar.style.width = "0%";
    auth.onAuthStateChanged(function(user) {
        if (user) {
                const selectedFile = document.getElementById('upload').files[0];
                imagesRef = storageRef.child('images/'+selectedFile.name);
                imagesRef.put(selectedFile,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    imagesRef.getDownloadURL()
                    .then((url) => {
                        db.collection("users").doc(user.uid).get().then((doc) => {

                                let newData = {...doc.data()};
                                newData.avatar = url;
                                db.collection("users").doc(doc.id).set(newData)
                                .then(() => {
                                    console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });
                            
                        })
                           
                       
                    })
                    .catch((error) => {
                    // Handle any errors
                    });
                
                });
            }
        });

    // var uploadTask = storageRef.child('images/'+selectedFile.name).put(selectedFile);

    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // uploadTask.on('state_changed', 
    // (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
        
    //     processbar.style.width = progress+"%";
    //     switch (snapshot.state) {
    //     case firebase.storage.TaskState.PAUSED: // or 'paused'
    //         console.log('Upload is paused');
    //         break;
    //     case firebase.storage.TaskState.RUNNING: // or 'running'
    //         console.log('Upload is running');
    //         break;
    //     }
    // }, 
    // (error) => {
    //     // Handle unsuccessful uploads
    // }, 
    // () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     });
    // }
    // );
    
})

