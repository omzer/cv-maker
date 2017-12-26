
// Carsousel animation
function slider_next() {
    $('.carousel.carousel-slider').carousel('next');
    setTimeout(slider_next, 4000);
}
slider_next();


// Buttons Action
const auth = firebase.auth();
const db = firebase.database().ref();
var sign_method = '!';
var newUser = null;


function signIn() {
    sign_method = 'in';

    const email = document.getElementById('in_email').value;
    const password = document.getElementById('in_password').value;

    auth.signInWithEmailAndPassword(email, password).catch(error => {
        showMessage(error.message);
    });

}



function signUp() {
    sign_method = 'up';
    const name = document.getElementById('up_name').value.toUpperCase();
    const date = document.getElementById('up_date').value;
    const email = document.getElementById('up_email').value;
    const password = document.getElementById('up_password').value;
    const password2 = document.getElementById('up_password2').value;

    var regex = /^[\w ]{4,20}$/;

    if (!regex.test(name)) {
        showMessage('Name must containers at least 4 characters, without special characters');
        return;
    }

    if (date.length == 0) {
        showMessage('Please choose a date');
        return;
    }

    if (password != password2) {
        showMessage('Passwords must be match !');
        return;
    }

    if (password.length < 6) {
        showMessage('Passwords must be at least 6 digits!');
        return;
    }


    auth.createUserWithEmailAndPassword(email, password).catch(e => {
        showMessage(e.message);
    });

    newUser = {
        user_email: email,
        user_name: name,
        user_birthday: date
    };

}

function showMessage(message) {
    document.getElementById('message_body').innerText = message;
    $('#message').modal('open');

}


// Reset Password
function forgetPassword() {
    const email = document.getElementById('in_email').value;
    auth.sendPasswordResetEmail(email).catch(error => {
        document.getElementById('message_body').innerText = error.message;
    });
    showMessage("Wait a sec..\nThen check your email inbux");
}


// Go to sign in page if not signed in -- use it in all forms
auth.onAuthStateChanged(user => {
    sessionStorage.setItem("auth", auth);
    if (user) {
        if (sign_method == 'up') {
            db.child('users').child(user.uid).set(newUser);
        }
        window.location.assign('index.html');
    }
});


