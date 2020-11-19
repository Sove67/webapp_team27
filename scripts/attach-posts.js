/*<![CDATA[*/
$(document).ready(function () {
    db.collection("posts")
        .get()
        .then(function (querySnapshot) {
            let postList = [];
            querySnapshot.forEach(function (post) {
                postList.push(post.data());
            });
            postList.forEach(function (item) {
                console.log(item);
                jQuery.get("/templates/post-list-card.html", function (postHTML) {
                    jQuery("#cardContainer").append(postHTML);
                }).then(function () {
                    let card = jQuery(".card:last-of-type");
                    card.find(".view").prop("href", "post.html?" + item.link);
                    card.find(".rating").text(item.rating);
                    card.find(".title").text(item.title);
                    card.find(".content").text(item.content);
                    card.find(".author").text(item.author);
                    let tagList = item.tagList.split(",");
                    tagList.forEach(function (tagText) {
                        let newTag = "<span class=\"badge badge-dark\">" +
                            tagText +
                            "</span>";
                        card.find(".tagList").append(newTag)
                    });
                })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
});
/*]]>*/