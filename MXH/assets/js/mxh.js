let authorInfomation = document.getElementById("authorInfomation");
let loginForm = document.getElementById("loginForm");
let authorName = document.getElementById("authorName");
let status = document.getElementById("status");

function authorLogin(){
    authorInfomation.style.display = "none";
    loginForm.style.display = "none";
    auth.onAuthStateChanged(function(user) {
        if(user != null){
            db.collection("users").doc(user.uid).get().then((userDoc) => {
                authorInfomation.style.display = "block";
                authorName.innerHTML = userDoc.data().name;
            })
            
        }else{
            loginForm.style.display = "block";
        }
    })
}

function renderStatus(){
    db.collection("status").get().then(querySnapshot => {
        status.innerHTML = "";
        statusList = "";
        querySnapshot.forEach(doc => {
            statusItem = `<div class="card gedf-card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="mr-2">
                            <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                        </div>
                        <div class="ml-2">
                            <div class="h5 m-0">Duy Nguyễn</div>
                            <!-- <div class="h7 text-muted">Miracles Lee Cross</div> -->
                        </div>
                    </div>
                    <div>
                        <!-- <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                <div class="h6 dropdown-header">Configuration</div>
                                <a class="dropdown-item" href="#">Save</a>
                                <a class="dropdown-item" href="#">Hide</a>
                                <a class="dropdown-item" href="#">Report</a>
                            </div>
                        </div> -->
                    </div>
                </div>

            </div>
            <div class="card-body">
                <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o mr-1"></i>${doc.data().createdAt.toDate()}</div>

                <p class="card-text">
                    ${doc.data().content}
                </p>
            </div>
            <div class="card-footer">
                <a href="#" class="card-link text-danger"><i class="fa fa-gittip mr-1"></i>${doc.data().reaction.length} Like</a>
                <a href="#" class="card-link"><i class="fa fa-comment mr-1"></i>${doc.data().comment.length} Comment</a>
            </div>
        </div>`

        statusList += statusItem;
        })
        status.innerHTML = statusList;
    })
}

authorLogin();
renderStatus();