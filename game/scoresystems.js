let recordTimeDisplay = document.getElementById('movecounter')

// this switch statement displays the top score (if there is one) on the top left of the playing board
switch(sessionStorage.difficulty){
    case "easy":
        if((localStorage.bestTimeEasy == undefined) || (localStorage.bestTimeEasy == "undefined")) {
        recordTimeDisplay.innerText = 'No best time to beat!'
        } 
        else if((localStorage.bestTimeEasy !== "undefined")&&(localStorage.bestTimeEasy !== undefined)){
            recordTimeDisplay.innerText = `Best: ${localStorage.bestTimeEasy}`
        }
        break;
    case "normal":
        if((localStorage.bestTimeNormal == undefined) || (localStorage.bestTimeNormal == "undefined")){
        recordTimeDisplay.innerText = 'No best time to beat!'
        } 
        if((localStorage.bestTimeNormal !== "undefined")&&(localStorage.bestTimeNormal !== undefined)){
        recordTimeDisplay.innerText = `Best: ${localStorage.bestTimeNormal}`
        }
        break;
    case "hard":
        if((localStorage.bestTimeHard == undefined) || (localStorage.bestTimeHard == "undefined")){
        recordTimeDisplay.innerText = 'No best time to beat!'
        } 
        if((localStorage.bestTimeHard !== "undefined")&&(localStorage.bestTimeHard !== undefined)){
        recordTimeDisplay.innerText = `Best: ${localStorage.bestTimeHard}`
        }
        break;
}


// 1. modal / popup

// 1.a defining modal variables
let overlay = document.getElementById('overlay');
let modal = document.getElementById('modal');
let playButton = document.getElementById('playbutton')

// 1.b call function to show modal when page has loaded
window.addEventListener('load', loadModal)

// the 'active' class makes the modal and overlay visible
function loadModal(){
    overlay.classList.add('active');
    modal.classList.add('active');
}

// call functions on click to remove modal and start timer
playButton.addEventListener('click', removeModal)
playButton.addEventListener('click', startStopTimer)
playButton.addEventListener('click', myFunction)

// removing the 'active' class from modal and overlay makes them invisible
function removeModal(){
    overlay.classList.remove('active');
    modal.classList.remove('active');
}

function myFunction(){
    source.appendChild('game/sounds/music/bensound-ukulele.mp3')
    audio.appendChild(source);
}


// --------------------------------------------------


// 2. timer

// 2.a defining timer variables
let seconds = 0;
let minutes = 0;
let hours = 0;
let time = 0;

// defining display value variables
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

// defining variable to hold setInterval() function
let interval = null;

// defining variable to hold timer status
let status = "stopped"

// 2.b timer function
function timer(){

    seconds++;

    // logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++

        if(minutes/60 === 1){
            minutes = 0
            hours++
        }
    }

    // if seconds/minutes/hours are only 1 digit, add a leading 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else {
        displayHours = hours;
    }

    time = `${displayHours} : ${displayMinutes} : ${displaySeconds}`

    // update time values to display for user
    document.getElementById('timecounter').innerText = time;
    time = time.toString()
    return time;
}


function startStopTimer(){
    if(status === "stopped"){

        // call stopclock function to see if criteria have been met to stop the time
        window.setInterval(stopClock, 100)

        // start the timer (by calling setInterval() function)
        interval = window.setInterval(timer, 1000);
        status = "started";
    }
}

function stopClock(){
    if(sessionStorage.runtheclock === "stop time"){
        window.clearInterval(interval);
        status = "stopped";
        timePlayed = time
        loadScoreModal()
        
    }
}


// --------------------------------------------------


// 3. modal / scoreboard

// 3.a defining modal variables
let overlay2    = document.getElementById('overlay2');
let scoreModal  = document.getElementById('scoremodal');
let difficultyDisplay = document.querySelector('.scoremodal-title')
let difficultylvl = sessionStorage.difficulty

let currentTime = document.getElementById('time')
let bestTime = document.getElementById('record')

// 3.b call function to show scoreboard / modal when game is finished
// the 'active' class makes the modal and overlay visible
function loadScoreModal(){
    overlay2.classList.add('active');
    scoreModal.classList.add('active');

    if(difficultylvl == "easy"){
        addScoreEasy(timePlayed)
    } else
    if(difficultylvl == "normal"){
        addScoreNormal(timePlayed)
    } else
    if(difficultylvl == "hard"){
        addScoreHard(timePlayed)
    }
}

// defining variables for saving highest score in local storage
let fastestTimeEasy = localStorage.bestTimeEasy
let fastestTimeNormal = localStorage.bestTimeNormal
let fastestTimeHard = localStorage.bestTimeHard


// difficultylevel-dependent functions which save highest score to local storage
function addScoreEasy(){  
    difficultyDisplay.innerText = `score - easy`
    currentTime.innerText = `Your time is ${timePlayed}!`

    localStorage.setItem('bestTimeEasy', fastestTimeEasy)
        
    if(localStorage.bestTimeEasy === "undefined"){
        fastestTimeEasy = timePlayed
        localStorage.setItem('bestTimeEasy', fastestTimeEasy)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeEasy}!`
    }      
    if(timePlayed < fastestTimeEasy){
        fastestTimeEasy = timePlayed
        localStorage.setItem('bestTimeEasy', fastestTimeEasy)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeEasy}!`
    }
    else if(timePlayed > fastestTimeEasy){
        document.getElementById('difficulty').innerText = 'OOPS! Better luck next time!'
        bestTime.innerText = `The time to beat is ${localStorage.bestTimeEasy}!`
    }
    localStorage.setItem('bestTimeEasy', fastestTimeEasy)
    localStorage.setItem('bestTimeNormal', fastestTimeNormal)
    localStorage.setItem('bestTimeHard', fastestTimeHard)
    return fastestTimeEasy;
}

function addScoreNormal(){
    difficultyDisplay.innerText = `score - normal`
    currentTime.innerText = `Your time is ${timePlayed}!`

    localStorage.setItem('bestTimeNormal', fastestTimeNormal)
        
    if(localStorage.bestTimeNormal === "undefined"){
        fastestTimeNormal = timePlayed
        localStorage.setItem('bestTimeNormal', fastestTimeNormal)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeNormal}!`
    }      
    if(timePlayed < fastestTimeNormal){
        fastestTimeNormal = timePlayed
        localStorage.setItem('bestTimeNormal', fastestTimeNormal)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeNormal}!`
    }
    else if(timePlayed > fastestTimeNormal){
        document.getElementById('difficulty').innerText = 'OOPS! Better luck next time!'
        bestTime.innerText = `The time to beat is ${localStorage.bestTimeNormal}!`
    }
    localStorage.setItem('bestTimeEasy', fastestTimeEasy)
    localStorage.setItem('bestTimeNormal', fastestTimeNormal)
    localStorage.setItem('bestTimeHard', fastestTimeHard)
    return fastestTimeNormal;
}

function addScoreHard(){
    difficultyDisplay.innerText = `score - hard`
    currentTime.innerText = `Your time is ${timePlayed}!`

    localStorage.setItem('bestTimeHard', fastestTimeHard)
        
    if(localStorage.bestTimeHard === "undefined"){
        fastestTimeHard = timePlayed
        localStorage.setItem('bestTimeHard', fastestTimeHard)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeHard}!`
    }      
    if(timePlayed < fastestTimeHard){
        fastestTimeHard = timePlayed
        localStorage.setItem('bestTimeHard', fastestTimeHard)
        document.getElementById('difficulty').innerText = `You set a new record!`
        bestTime.innerText = `Your new best time to beat is now ${localStorage.bestTimeHard}!`
    }
    else if(timePlayed > fastestTimeHard){
        document.getElementById('difficulty').innerText = 'OOPS! Better luck next time!'
        bestTime.innerText = `The time to beat is ${localStorage.bestTimeHard}!`
    }
    localStorage.setItem('bestTimeEasy', fastestTimeEasy)
    localStorage.setItem('bestTimeNormal', fastestTimeNormal)
    localStorage.setItem('bestTimeHard', fastestTimeHard)
    return fastestTimeHard;  
}


// --------------------------------------------------


// 4. modal buttons

// 4.a retry button

let retryButton = document.getElementById('retry')
let menuButton = document.getElementById('mainmenu')

retryButton.addEventListener('click', restartFunction)
menuButton.addEventListener('click', menuFunction)

function restartFunction(){
    location.reload()
}

function menuFunction(){
    window.location.href='..//index.html'
}

// NEXT JOB: CREATE CUTE SOUND EFFECTS WHICH TRIGGER ON CLICK