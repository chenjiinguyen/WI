function renderMessages(){
    let chatbox = document.getElementById("chatbox");
    auth.onAuthStateChanged(function(user) {
        if (user) {
            let me = user;
            db.collection("chatbox").get().then((querySnapshot) => {
                let all_chat = "";
                querySnapshot.forEach((doc) => {
                    let chat_ele = ""
                    if(me.uid == doc.data().user.uid){
                        chat_ele = `<div class="d-flex justify-content-end mb-4">
                        <div class="msg_cotainer_send">
                             ${doc.data().message}
                            <span class="msg_time_send">Me</span>
                        </div>
                        <div class="img_cont_msg">
                    <img src="https://picsum.photos/200" class="rounded-circle user_img_msg">
                        </div>
                    </div>`
                    }else{
                        chat_ele = `<div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src="https://picsum.photos/200" class="rounded-circle user_img_msg">
                        </div>
                        <div class="msg_cotainer">
                            ${doc.data().message}
                            <span class="msg_time">${doc.data().user.name}</span>
                        </div>
                    </div>`
                    }
                    
                    all_chat += chat_ele;
                });
                chatbox.innerHTML = all_chat;
            });
        } else {
            window.location.href = "dangnhap.html";
        }
    });
}

setInterval(renderMessages,2000);
