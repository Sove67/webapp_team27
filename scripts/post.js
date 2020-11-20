$(document).ready(function () {

    //Get post id from the url, then use it to create the post.
    var queryString = decodeURIComponent(window.location.search);
    var queries = queryString.split("?"); //delimiter
    var postID = queries[1];
    console.log(postID);
    db.collection("posts").doc(postID)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.data().post);
        $(".post-title").text(querySnapshot.data().title);
        $(".post-content").text(querySnapshot.data().post)
      });


    db.collection("posts").doc(postID).collection("comments")
      .get()
      .then(function (snapshot) {
        snapshot.docs.forEach(doc => {
          $("body").append()
        });

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });


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

            card.find("#comment-content").text(item.comment);
            card.find("#comment-rating").text(item.rating);
            
            
          })
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });



    //Add comments to the database when the submit button is pressed
    document.getElementById("create-comment").addEventListener("submit", function (e) {
      e.preventDefault();
      var comment = document.getElementById("exampleFormControlTextarea1").value;

      console.log(comment);

      db.collection("posts").doc(postID).collection("comments").add({
        "comment": comment,
        "rating": 0
      });
    });
  });