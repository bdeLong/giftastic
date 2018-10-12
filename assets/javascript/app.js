$(document).ready(function () {
  // initialize starting array of items we'll use to pull gifs.
  var foodArray = ["Hot Dogs", "Burgers", "Pizza", "Fruit", "Soup", "Desserts", "Salads", "Appetizers", "Sandwiches"];
  // function that makes a request to giphy API based on button's data-food attribute
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
          // loops through the results and creates a div/p/image element for each gif and appends them to the gif-container div as a still image.
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
        // when a gif is clicked, it changes it's attribute to either still or animate.  This cause the gif to either play or pause.
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
      });
  };
  // function creates buttons and adds a button to the DOM when user enters a value in the input field.
  function createButtons() {
    $("#gif-buttons").empty();
    for (i = 0; i < foodArray.length; i++) {
      var newButton = $("<button>");
      newButton.text(foodArray[i].toLowerCase());
      newButton.attr({ "data-food": newButton.text(), "class": "food-button" });
      $("#gif-buttons").append(newButton);
    }
  };
  // function that pushes value of input field to the array and creates new buttons when user hits "enter" or clicks the "conjure" button
  $("#submit-button").on("click", function (event) {
    event.preventDefault();
    var newFood = $("#food-input").val().trim();
    foodArray.push(newFood);
    createButtons();
    $("#food-input").blur();
  });
  // runs the grabFoodGif function everytime a food button is clicked (has class of food-button)
  $(document).on("click", ".food-button", grabFoodGif);
  // creates the initial buttons to begin with.
  createButtons();
});