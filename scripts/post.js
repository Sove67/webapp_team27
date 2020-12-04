$(document).ready(function () {

    //Get post id from the url, then use it to find the post in the database and write the data to the page.
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?"); //delimiter
    var postID = queries[1];
    console.log(postID);
    db.collection("posts").doc(postID)
        .get()
        .then(function (querySnapshot) {
            $(".post-title").text(querySnapshot.data().title);
            $(".post-content").text(querySnapshot.data().description);
            $("#post-rating").text(querySnapshot.data().rating);
            let type = querySnapshot.data().type;
            let typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
            $(".post-type").text(typeCapitalized);

            db.collection("users").doc(querySnapshot.data().authorId)
                .get()
                .then(function (authSnapshot){
                    $(".post-author").text("By: " + authSnapshot.data().name);
                })
            
        });

    //Add comments to the post by reading them from the database.
    db.collection("posts").doc(postID).collection("comments")
        .get()
        .then(function (snapshot) {
            let commentList = [];
            snapshot.forEach(function (comment) {
                commentList.push(comment.data());
            });
            commentList.forEach(function (item) {
                console.log(item);
                jQuery.get("/templates/comment.html", function (commentHTML) {
                    jQuery("#comment-container").append(commentHTML);
                }).then(function () {
                    let card = jQuery(".card:last-of-type");
                    var commentId = item.id;
                    console.log(commentId);
                    card.find(".comment-author").text(item.commentAuthor);
                    card.find("#comment-content").text(item.comment);
                    card.find("#comment-rating").text(item.rating);
                    card.find(".comment-upvote").prop("id", commentId + "upvote");
                    card.find(".comment-downvote").prop("id", commentId + "downvote");
                    
                    //Make the comment upvote buttons increment the comment rating in the database and on the page.
                    document.getElementById(commentId + "upvote").addEventListener("click", function (e){
                        e.preventDefault();
                        var newCommentRating = item.rating + 1;
                        console.log("comment rating: " + newCommentRating);
                        console.log(item);
                        db.collection("posts").doc(postID).collection("comments").doc(commentId)
                        .set({
                            "rating": newCommentRating
                        },{
                            merge: true
                        })
                        .then(() => {
                            location.reload();
                        });
                    });

                    //Make the comment downvote buttons decrement the comment rating in the database and on the page.
                    document.getElementById(commentId + "downvote").addEventListener("click", function (e){
                        e.preventDefault();
                        var newCommentRating = item.rating - 1;
                        console.log("comment rating: " + newCommentRating);
                        console.log(item);
                        db.collection("posts").doc(postID).collection("comments").doc(commentId)
                        .set({
                            "rating": newCommentRating
                        },{
                            merge: true
                        })
                        .then(() => {
                            location.reload();
                        });
                    });
                })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });


    //Make the post upvote button increment the post rating in the database and on the page.
    document.getElementById("post-upvote").addEventListener("click", function (e) {
        e.preventDefault();
        console.log("hit up button");
        db.collection("posts").doc(postID).get()
            .then(function (upvoteSnapshot) {
                var newRating = upvoteSnapshot.data().rating + 1;
                console.log(newRating);
                db.collection("posts").doc(postID).set({
                    "rating": newRating
                }, {
                    merge: true
                })
                .then(() => {
                    location.reload();
                });
            });
    });

    //Make the post downvote button decrement the post rating in the database and on the page.
    document.getElementById("post-downvote").addEventListener("click", function (e) {
        e.preventDefault();
        console.log("hit down button");
        db.collection("posts").doc(postID).get()
            .then(function (upvoteSnapshot) {
                var newRating = upvoteSnapshot.data().rating - 1;
                console.log(newRating);
                db.collection("posts").doc(postID).set({
                    "rating": newRating
                }, {
                    merge: true
                })
                .then(() => {
                    location.reload();
                });
            });
    });

    //Add comments to the database when the submit button is pressed.
    document.getElementById("create-comment").addEventListener("submit", function (e) {
        e.preventDefault();
        var comment = document.getElementById("exampleFormControlTextarea1").value;

        firebase.auth().onAuthStateChanged(function (user){
            if (user){
                db.collection("posts").doc(postID).collection("comments").add({
                    "comment": comment,
                    "rating": 0,
                    "commentAuthorId": user.uid,
                    "commentAuthor": user.displayName
                })
                .then(function(docRef){
                    console.log("ID: " + docRef.id)
                    db.collection("posts").doc(postID).collection("comments").doc(docRef.id).set({
                        "id": docRef.id
                    }, {merge: true});
                })
                .then(() => {
                    location.reload();
                });
            }
        });
    });
});

    
