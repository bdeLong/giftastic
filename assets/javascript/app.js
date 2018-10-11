var foodArray = ["Hot Dogs", "Burgers", "Pizza", "Fruit", "Soup", "Desserts", "Salads", "Appetizers", "Sandwiches"];

function grabFoodGif() {
  var foodItem = $(this).attr("data-food");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    foodItem + "&api_key=68S60hcbZCMYYekjvRJh81WGjQjLtHCW&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var rating = results[i].rating;
        var gifDiv = $("<div>").attr("class", "d-inline-block");
        var gifRating = $("<p>").text("Rating: " + rating);
        var foodGif = $("<img>");
        foodGif.addClass("food-gif");
        foodGif.attr({ "src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url, "data-state": "still" });
        gifDiv.append(foodGif);
        gifDiv.append(gifRating);
        $("#gif-container").prepend(gifDiv);
      };

      $(".food-gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      console.log(response);
    });
};

function createButtons() {
  $("#gif-buttons").empty();
  for (i = 0; i < foodArray.length; i++) {
    var newButton = $("<button>");
    newButton.text(foodArray[i].toLowerCase());
    newButton.attr({ "data-food": newButton.text(), "class": "food-button" });
    $("#gif-buttons").append(newButton);
  }
};


$("#submit-button").on("click", function (event) {
  event.preventDefault();
  var newFood = $("#food-input").val().trim();
  foodArray.push(newFood);
  createButtons();
});

$(document).on("click", ".food-button", grabFoodGif);

createButtons();