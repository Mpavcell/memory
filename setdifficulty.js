sessionStorage.removeItem('difficulty')

// 1. Theme selection

// defining variables for theme selection
localStorage.removeItem('selectedTheme');
let animalTheme = document.getElementById('animals');
let natureTheme = document.getElementById('nature');

// adds the event listeners to the theme buttons
animalTheme.addEventListener('click', setSelectedThemeAnimal)
natureTheme.addEventListener('click', setSelectedThemeNature)
animalTheme.addEventListener('click', changeAnimalThemePicToSelectedThemePic)
natureTheme.addEventListener('click', changeNatureThemePicToSelectedThemePic)


let selectedTheme = ""

// functions that are called on click event
function setSelectedThemeAnimal(){
    selectedTheme = "animals"
    localStorage.setItem('selectedTheme', selectedTheme)
    return selectedTheme;
}

function setSelectedThemeNature(){
    selectedTheme = "nature"
    localStorage.setItem('selectedTheme', selectedTheme)
    return selectedTheme;
}

function changeAnimalThemePicToSelectedThemePic(){
    if(localStorage.selectedTheme === "animals"){
    this.style.backgroundImage = `url(animals-selected.jpg)`;
    this.style.border = '5px solid lightgreen'
    natureTheme.style.backgroundImage = `url(nature.jpg)`
    natureTheme.style.border = `1px solid white`
    }
}

function changeNatureThemePicToSelectedThemePic(){
    if(localStorage.selectedTheme === "nature"){
    this.style.backgroundImage = `url(nature-selected.jpg)`;
    this.style.border = '5px solid lightgreen'
    animalTheme.style.backgroundImage = `url(animals.jpg)`;
    animalTheme.style.border = `1px solid white`
    }
}

//----

// 2. difficulty selection

// defining variables for difficultysettings in main menu
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');

// function that adds the event listeners to the difficulty buttons
easy.addEventListener('click', createVar1);
medium.addEventListener('click', createVar2);
hard.addEventListener('click', createVar3);

let difficultySetting = 0;

// functions that store selected difficulty setting in sessionstorage
function createVar1(){
    let difficultySetting = "easy";
    sessionStorage.clear();
    sessionStorage.setItem("difficulty", difficultySetting);
    
    easy.style.color = '#2FA64A'
    medium.style.color = 'white'
    hard.style.color = 'white'

    easy.style.backgroundColor = '#c6f8b3'
    medium.style.backgroundColor = '#2FA64A'
    hard.style.backgroundColor = '#E82301'

    easy.style.border = '5px solid lightgreen'
    medium.style.border = '1px solid white'
    hard.style.border = '1px solid white'

    return difficultySetting;
}
function createVar2(){
    let difficultySetting = "normal";
    sessionStorage.clear();
    sessionStorage.setItem("difficulty", difficultySetting);

    medium.style.color = '#2FA64A'
    easy.style.color = 'white'
    hard.style.color = 'white'

    medium.style.backgroundColor = '#c6f8b3'
    easy.style.backgroundColor = '#F0A403'
    hard.style.backgroundColor = '#E82301'

    medium.style.border = '5px solid lightgreen'
    easy.style.border = '1px solid white'
    hard.style.border = '1px solid white'

    return difficultySetting;
}
function createVar3(){
    let difficultySetting = "hard";
    sessionStorage.clear();
    sessionStorage.setItem("difficulty", difficultySetting);

    hard.style.color = '#2FA64A'
    medium.style.color = 'white'
    easy.style.color = 'white'

    hard.style.backgroundColor = '#c6f8b3'
    medium.style.backgroundColor = '#2FA64A'
    easy.style.backgroundColor = '#F0A403'

    hard.style.border = '5px solid lightgreen'
    medium.style.border = '1px solid white'
    easy.style.border = '1px solid white'

    return difficultySetting;
}

//----

// 3. play button

// defining variable for play button
let playButton = document.getElementById('playbutton');

// adds the event listeners to the play button
playButton.addEventListener('click', verify)

// function that verifies if the theme and difficulty has been set by player
function verify(){
    if((localStorage.selectedTheme === "nature" || localStorage.selectedTheme === "animals") &&
        (sessionStorage.difficulty === "easy" || sessionStorage.difficulty === "normal" || 
        sessionStorage.difficulty === "hard")){
            linkToGame()
        } else {
            displayModal()
        }
}

function linkToGame(){
    if(sessionStorage.difficulty === "easy"){
        location.href = "game/game_easy.html"
    } else
    if(sessionStorage.difficulty === "normal"){
        location.href = "game/game.html"
    } else
    if(sessionStorage.difficulty === "hard"){
        location.href = "game/game_hard.html"
    }
}

//----

// 4. modal / popup

// 1 defining modal variables
let overlay = document.getElementById('overlay');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('closemodal')

// function that loads modal if theme and/or difficulty are not selected 
function displayModal(){
    overlay.classList.add('active');
    modal.classList.add('active');
}

// call functions on click to remove modal and start timer
closeModal.addEventListener('click', removeModal)

// removing the 'active' class from modal and overlay makes them invisible
function removeModal(){
    overlay.classList.remove('active');
    modal.classList.remove('active');
}
