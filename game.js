
//declare a var that takes in array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

//declare a var that tkaes in an empty array 
var gamePattern = [];

//declare a var that tkaes in an empty array 
var userClickedPattern = [];
//set a variable to false so the game wont start right away and only on trigger events 
var started = false;

//declare a var and assign it to letter with a value of 0 
var level = 0;

//Whenever the key is pressed the game starts changing from false to true and starting the sequence 
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//the button that you click to choose the color of the new pattern 
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//Created a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
//if you get something wrong this gets called 
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function (){
      $("body").removeClass("game-over")
      }, 200);

      //update the h1 to say game over. Try Again ?
      $("#level-title").text("Game over. Try Again?");
    
    startOver();
    }

}




function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
//declare a var called randomNUmber that creates a random number up to 3 
  var randomNumber = Math.floor(Math.random() * 4);
  
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//create a function playSound that can be used to play a sound when each option is clicked 
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Let an animation happen when the currentcolor is called up with a timer of 100
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//if you get it wrong this gets called and the game restarts  
function startOver() {

  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}