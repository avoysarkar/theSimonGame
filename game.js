var userClickedPattern=[];
var gamePattern =[];
var buttonColours = ["red", "blue", "green", "yellow"]; 
var level =0;
var started= true;

$(document).keydown(function(){
    if(started==true){
        started=false;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
    level++;
    $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); //this.getAttribute is similar to $(this).attr
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    new Audio('sounds/'+name+'.mp3').play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log(userClickedPattern);
        console.log(gamePattern);
        if(userClickedPattern.length === gamePattern.length){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
        gameOver();
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver(){
    gamePattern=[];
    started=true;
    level=0;
}