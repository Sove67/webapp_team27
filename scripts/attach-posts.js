/*<![CDATA[*/
$(document).ready(function () {
    // Fetch the posts from firebase
    db.collection("posts")
        .get()
        .then(function (querySnapshot) {
            let postList = [];
            let queryString = decodeURIComponent(window.location.search);
            let queries = queryString.split("?"); //delimiter
            let searchText = queries[1];
            querySnapshot.forEach(function (post) {
                // Add data if it matches the search, or add all data if there is no search.
                console.log(post.data().type.toLowerCase())
                if (searchText != undefined && (post.data().title.toLowerCase().includes(searchText.toLowerCase()) || post.data().type.toLowerCase().includes(searchText.toLowerCase()) || post.data().description.toLowerCase().includes(searchText.toLowerCase()))) {
                    postList.push(post.data());
                } else if (searchText == undefined) {
                    postList.push(post.data());
                }
            });
            // For each data item that was added, create a new card.
            postList.forEach(function (item) {
                jQuery.get("/templates/post-list-card.html", function (postHTML) {
                    jQuery("#cardContainer").append(postHTML);
                }).then(function () {
                    let card = jQuery(".card:last-of-type");
                    card.find(".view").prop("href", "post.html?" + item.link);
                    card.find(".rating").text(item.rating);

                    let typeCapitalized = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                    card.find(".type").text(typeCapitalized)

                    card.find(".title").text(item.title);
                    card.find(".description").text(item.description);
                    card.find(".author").text(item.author);
                })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
});
/*]]>*/