//When accessing parts of the website that require an account, check that the user is logged in.
$(".accountRequired").click(login);

function login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/login.html?";
        }
    });
}