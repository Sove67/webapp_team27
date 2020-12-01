$(document).ready(function () {
    // When search is clicked, navigate to the post list page with the search term in the url queries.
    $(".logOut").on("click", function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "/home.html";
        }, function (error) {
            console.log("ERROR.");
        });
    });
});