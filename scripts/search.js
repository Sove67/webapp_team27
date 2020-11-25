$(document).ready(function () {
    $(".search").on("click", function () {
        let searchTerm = $(".searchTerm").val();
        window.location.href = "/post-list.html?" + searchTerm;
    });
});