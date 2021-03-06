// Create a root reference
let storageRef = storage.ref();
var metadata = {
    contentType: 'image/png',
};
let uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click",function(){
    const selectedFile = document.getElementById('upload').files[0];
    imagesRef = storageRef.child('images/'+selectedFile.name);
    imagesRef.put(selectedFile,metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        imagesRef.getDownloadURL()
        .then((url) => {
          console.log(url)
        })
        .catch((error) => {
          // Handle any errors
        });
      
    });
})

