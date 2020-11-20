$(".accountRequired").click(login);
$("p").click(login);

function login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/login.html?";
        }
    });
}