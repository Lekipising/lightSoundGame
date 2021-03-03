// global constants
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const audioAp = new Audio("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Fapplause.wav?v=1614810190071");
const audioLo = new Audio("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Ffailed.wav?v=1614810225351");
const btn1s = new Audio("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Fbtn1.mp3?v=1614810205518");
const btn2s = new Audio("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Fbtn2.mp3?v=1614810211156");
const btn3s = new Audio("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Fbtn3.mp3?v=1614810213694");
const btn4s = new Audio ("https://cdn.glitch.com/40cb417e-7307-40a8-a7a4-99ff11deb908%2Fbtn4.mp3?v=1614810218553");

//Global Variables
var pattern = [2, 3, 3, 1, 4, 4, 2, 3];
var progress = 0;
var gamePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var tries = 3;


function showTries(tr){
  document.getElementById("try").innerHTML="Tries left : " + tr;
}


function startGame(){
    //initialize game variables
    progress = 0;
    gamePlaying = true;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
}


function stopGame(){
    //initialize game variables
    gamePlaying = false;
    tries = 3;
    document.getElementById("try").innerHTML="Tries left : 3";
    // swap the Start and Stop buttons
    document.getElementById("stopBtn").classList.add("hidden");
    document.getElementById("startBtn").classList.remove("hidden");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
    if(gamePlaying){
      lightButton(btn);
      playTone(btn);
      setTimeout(clearButton,clueHoldTime,btn);
    }
}

function playClueSequence(){
    guessCounter = 0;
    let delay = nextClueWaitTime; //set delay to initial wait time
    for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
      console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
      setTimeout(playSingleClue,delay,pattern[i]); // set a timeout to play that clue
      delay += clueHoldTime;
      delay += cluePauseTime;
    }
}

function loseGame(){
  if (tries == 0){
    stopGame();
    audioLo.play();
    alert("Game Over. You lost.");
  }
  else {
    alert("Wrong Sequence, try again!");
    showTries(tries);
  }
  
}

function winGame(){
  stopGame();
  audioAp.play();
  alert("Game Over. You WON!.");
}

function guess(btn){
  console.log("user guessed: " + btn);
  playTone(btn);
  if(!gamePlaying){
    return;
}

  // add game logic here
  if(pattern[guessCounter] == btn){
      //Guess was correct!
      if(guessCounter == progress){
        if(progress == pattern.length - 1){
          //GAME OVER: WIN!
          winGame();
        }else{
          //Pattern correct. Add next segment
          progress++;
          playClueSequence();
        }
      }else{
        //so far so good... check the next guess
        guessCounter++;
      }
    }else{
      //Guess was incorrect
      //GAME OVER: LOSE!
      tries -= 1;
      loseGame();
    }
}

// Sound Synthesis Functions
const freqMap = {
  1: btn1s,
  2: btn2s,
  3: btn3s,
  4: btn4s
}

function playTone(btn){
  freqMap[btn].play();
}


