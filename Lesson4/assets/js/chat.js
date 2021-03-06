function renderMessages(){
    let chatbox = document.getElementById("chatbox");
    
    auth.onAuthStateChanged(function(user) {
        if (user) {
            let me = user;
            db.collection("chatbox").get().then((querySnapshot) => {
                chatbox.innerHTML = "";
                querySnapshot.forEach((doc) => {
                    // LẤY DỮ LIỆU NGƯỜI DÙNG TỪ USERS
                    db.collection("users").doc(doc.data().uid).get().then((userDoc) => {
                        let chat_ele = "";
                        if (doc.exists) {
                            if(me.uid == userDoc.data().uid){
                                chat_ele = `<div class="d-flex justify-content-end mb-4">
                                <div class="msg_cotainer_send">
                                     ${doc.data().message}
                                    <span class="msg_time_send">Me</span>
                                </div>
                                <div class="img_cont_msg">
                            <img src="${userDoc.data().avatar}" class="rounded-circle user_img_msg">
                                </div>
                            </div>`
                            }else{
                                chat_ele = `<div class="d-flex justify-content-start mb-4">
                                <div class="img_cont_msg">
                                    <img src="${userDoc.data().avatar}" class="rounded-circle user_img_msg">
                                </div>
                                <div class="msg_cotainer">
                                    ${doc.data().message}
                                    <span class="msg_time">${userDoc.data().name}</span>
                                </div>
                            </div>`
                            }
                            // chat_all += chat_ele;
                            chatbox.innerHTML += chat_ele;
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                            
                     
                    })
                    // chatbox.innerHTML = chat_all;
                });
                
            });
        } else {
            window.location.href = "dangnhap.html";
        }
    });
}

setInterval(renderMessages,2000);
