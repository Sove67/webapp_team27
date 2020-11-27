$(document).ready(function () {
    // When search is clicked, navigate to the post list page with the search term in the url queries.
    $(".search").on("click", function () {
        let searchTerm = $(".searchTerm").val();
        window.location.href = "/post-list.html?" + searchTerm;
    });
});