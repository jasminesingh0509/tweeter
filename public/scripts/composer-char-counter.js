// Function to update the character counter 


// declare max value of count 
// minus remainder from count to get how many characters 
$(document).ready(function() {
  const max = 140;
  const display = $(".counter");
  $(".new-tweet")
    .find("#textArea")
    .on("keyup", function(event) {
      const count = $(this).val().length;
      const remainder = max - count;
      display.text(remainder);

      if (remainder > 0) {
        display.css("color", "#545149");
      } else {
        display.css("color", "#FF0000");
      }
    });
});
