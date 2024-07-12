let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let audio1 = new Audio("public/sounds/red.mp3");
let audio2 = new Audio("public/sounds/blue.mp3");
let audio3 = new Audio("public/sounds/green.mp3");
let audio4 = new Audio("public/sounds/yellow.mp3");
let audio = new Audio("public/sounds/wrong.mp3");
function nextSequence()
{  
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("Level "+level);
    level++;
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}
function playSound(name)
{
    if(name==='red') audio1.play();
    else if(name==='blue') audio2.play();
    else if(name==='green') audio3.play();
    else if(name==='yellow') audio4.play();
}
function animatePress(name)
{
    $("#" + name).addClass("pressed");
    setTimeout(function (){
    $("#" + name).removeClass("pressed");
    } , 100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if(currentLevel === (gamePattern.length - 1))
        {
            userClickedPattern = [];
            setTimeout(nextSequence , 1000);
        }
    }
    else
    {   
        $("body").addClass("game-over");
        audio.play();
        setTimeout(function (){
        $("body").removeClass("game-over");
        } , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
    }
}

$(document).keydown(()=>
    {
        if(gamePattern.length == 0)  nextSequence();
    }
);

$(".btn").click(function ()
{ 
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
