var topics = ["Eric Cartman", "Kenny McCormick", "Kyle Broflovski", "Stan Marsh", "Sharon Marsh", "Token Black"];

function createImages() {
  var search = $(this).attr("search-term");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
          url: queryURL,
          method: "GET"
        })
  .done(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var imageDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var imageInsert = $("<img>");
      imageInsert.attr("src", results[i].images.fixed_height_still.url);
      imageInsert.attr("imageState", "still");
      imageInsert.attr("imageStill", results[i].images.fixed_height_still.url);
      imageInsert.attr("imageAnimate", results[i].images.fixed_height.url);
      imageInsert.attr("class", "images");
      imageDiv.append(p);
      imageDiv.append(imageInsert);
      $("#imageResults").prepend(imageDiv);
    }
  });
}

$(document).on("click", ".images", function() {
   var state = $(this).attr("imageState");
   if (state === "still") {
     $(this).attr("src", $(this).attr("imageAnimate"));
     $(this).attr("imageState", "animate");
   } else {
     $(this).attr("src", $(this).attr("imageStill"));
     $(this).attr("imageState", "still");
   }
 });

function createButtons() {
  $("#imageButtons").empty();
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("imageButton");
    button.attr("search-term", topics[i]);
    button.addClass("btn btn-info")
    button.text(topics[i]);
    $("#imageButtons").append(button);
  }
}

$("#addImageButton").on("click", function(event) {
  event.preventDefault();
  var topicadd = $("#imageSearch").val().trim();
  topics.push(topicadd);
  createButtons();
});

$(document).on("click", ".imageButton", createImages);
createButtons();
