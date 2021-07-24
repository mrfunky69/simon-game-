
var buttoncolors = ["red","blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];

var started = false;
var level =0;

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("level "+ level)
    nextsequence();
    started = true;
  }
});

$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){
  if(gamepattern[currentLevel]=== userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamepattern.length){
      level++;
      setTimeout (function(){
        nextsequence();
      },1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }


}

function nextsequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+ level);
  var randomnumber = Math.floor(Math.random()*4);
  var randomchosencolor = buttoncolors[randomnumber];

 gamepattern.push(buttoncolors[randomnumber]);

 $("#" +randomchosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playsound(randomchosencolor);
 }


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
   audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level =0;
  gamepattern = [];
  started = false;
}
