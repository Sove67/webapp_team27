console.log("hello");

function addListener() {
    document.getElementById("forms").addEventListener("submit", function (e) {
        // disable default form handling
        e.preventDefault();

        // grab what user typed
        var postType = $('#postType input:radio:checked').attr("id");
        var title = document.getElementById("validationDefault01").value;
        var description = document.getElementById("validationDefault02").value;
        

        // write the values into new database document
        
        db.collection("posts")
            .add({ //using the add() function, auto-generated doc ID
                "type": postType,
                "title": title,
                "description": description,
                "rating": 0,
            })
            .then(function(docRef){
                console.log("ID: " + docRef.id)
                db.collection("posts").doc(docRef.id).set({
                    "link": docRef.id
                }, {merge: true});
                window.location.href = "/post.html?"+docRef.id;
            });
    })
}
addListener();