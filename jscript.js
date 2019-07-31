  // Initial array of fruits
  var fruits = ["Mango"];

  // displayfruitInfo function re-renders the HTML to display the appropriate content
  function displayfruitInfo() {


    var fruit = $(this).attr("data-name");
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" +
    fruit + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Creating an AJAX call for the specific fruit button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then( function(response) {
console.log(response)

var results= response.data;
$("#fruits-view").empty();

for (var i = 0; i < results.length; i++) {
      // Creating a div to hold the fruit
      var fruitDiv = $("<div class='fruit col-md-4'>");

   

      // Creating an element to have the rating displayed
      var pOne = $("<p style='font-size: 25px'>").text("Rating: " + results[i].rating);
     
      // Displaying the rating
      fruitDiv.append(pOne);

      
      var Image=$("<img >");
      // Creating an element to hold the image
     
            Image.attr("src", results[i].images.original_still.url);
            Image.attr("data-still", results[i].images.original_still.url);
            Image.attr("data-animate", results[i].images.original.url);
            Image.attr("data-state", "still");
            Image.attr("class", "gif col-lg-12");
         
      fruitDiv.append(Image);

      // Putting the entire fruit above the previous results
      $("#fruits-view").prepend(fruitDiv);

} 
    });
    
          

  }
  function imageChangeState() {          

var state = $(this).attr("data-state");
var animateImage = $(this).attr("data-animate");
var stillImage = $(this).attr("data-still");

if(state === "still") {
$(this).attr("src", animateImage);
$(this).attr("data-state", "animate");
}

else if(state === "animate") {
$(this).attr("src", stillImage);
$(this).attr("data-state", "still");
}   
}

  // Function for displaying fruit data
  function renderButtons() {

    // Deleting the fruits prior to adding new fruits
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of fruits
    for (var i = 0; i < fruits.length; i++) {

      // Then dynamicaly generating buttons for each fruit in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button class='button'>");
      // Adding a class of fruit-btn to our button
      a.addClass("fruit-btn");
      // Adding a data-attribute
      a.attr("data-name", fruits[i]);
      // Providing the initial button text
      a.text(fruits[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a fruit button is clicked
  $("#add-fruit").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var fruit = $("#fruit-input").val().trim();

    // Adding fruit from the textbox to our array
    fruits.push(fruit);

    // Calling renderButtons which handles the processing of our fruit array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "fruit-btn"
  $(document).on("click", ".fruit-btn", displayfruitInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
  $(document).on("click", ".gif", imageChangeState);



  