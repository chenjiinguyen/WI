var firebaseConfig = {
    apiKey: "AIzaSyBlR9PbbXdBTiNtESCNtHUJgwKFL9dUN0I",
    authDomain: "wi01-duy.firebaseapp.com",
    projectId: "wi01-duy",
    storageBucket: "wi01-duy.appspot.com",
    messagingSenderId: "613169758400",
    appId: "1:613169758400:web:df6c3ed822eb68de4cad25"
};

// Kết nối Firebase
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let db = firebase.firestore();
let storage = firebase.storage();