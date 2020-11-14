$(document).ready(function () {
    let templateList = ["navbar"];
    templateList.forEach(function (name) {
        jQuery.get("/templates/" + name + ".html", function (postHTML) {
            jQuery("#" + name + "Container").append(postHTML);
        });
    });
});