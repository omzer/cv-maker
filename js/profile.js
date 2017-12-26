
const auth = firebase.auth();
// Go to sign in page if not signed in -- use it in all forms
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.assign('sign.html');
    }

});

// load data from local storage
const name = document.getElementById('name').innerText = "Sir Name: " + localStorage.getItem('name');
const email = document.getElementById('date').innerText = "Date of Birth: " + localStorage.getItem('date');
const date = document.getElementById('email').innerText = "User Email: " + localStorage.getItem('email');


// Sign out button

function signOut() {
    auth.signOut();
}