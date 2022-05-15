var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var start=false;
var bestScore=0;
var more;
$(document).keypress(function(){
  if (!start){
    $("h2").addClass("hidden");
    $("h3").removeClass("hidden");
    $("level-title").text("Level: "+ level);
    nextSequence();
    start=true;
  }
});


$(".btn").click(function(){
  if (start==true){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    if (gamePattern.length==userClickedPattern.length){
      more--;
      $(".More_Match").text(more + " to match");
      setTimeout(function(){
        playSound("crash");
      }, 300);

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    else{
      more--;
      $(".More_Match").text(more + " to match");
    }
  }
  else{
    if ((level-1)>bestScore)
    {
      bestScore=level-1;
    }
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Your Score is "+(level-1)+"!! Press Any Key to Restart");
    $(".best_score").removeClass("hidden");
    $(".best_score").text("Your Best Score is "+ bestScore);
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}
function nextSequence()
{
  userClickedPattern=[];
  level++;
  more=level;
  $("#level-title").text("Level " + level);
  $(".More_Match").text(more +" to match");
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}
