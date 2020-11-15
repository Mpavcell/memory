let runTheClock = "go time";
sessionStorage.setItem('runtheclock', runTheClock)

// this function dynamically loads a css file into the head tag of the html document
// the css file contains a cardset of memory cards
function loadCssFile(){
if (localStorage.selectedTheme === 'animals'){ 
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", 'animalcardset.css')
    document.getElementsByTagName("head")[0].appendChild(fileref)
    }

if (localStorage.selectedTheme === 'nature'){ 
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", 'naturecardset.css')
    document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}
loadCssFile()

let numberOfDivs;
grid = document.getElementById('gridcontainer');
scoreCountBar = document.querySelector('.scorecountcontainer')

// this function checks the difficulty selected in the main menu.
// depending on the difficulty selected, it sets the number of divs that make up the memory-card grid
// it also styles the grid-template-columns property by setting it to the square root of the number of divs.



function checkDifficulty(){
    if(sessionStorage.difficulty === "easy"){
        numberOfDivs = 16;
        grid.style.gridTemplateColumns = `repeat(${Math.sqrt(numberOfDivs)}, 1fr)`
        return numberOfDivs
    } else if(sessionStorage.difficulty === "normal"){
        numberOfDivs = 20;
        grid.style.gridTemplateColumns = `repeat(${5}, 1fr)`
        return numberOfDivs;
    } else if(sessionStorage.difficulty === "hard"){
        numberOfDivs = 30;
        grid.style.gridTemplateColumns = `repeat(${6}, 1fr)`
        return numberOfDivs;
    }
}
checkDifficulty();

let gridItem = [];
let exclusionArray1 = [];
let exclusionArray2 = [];
for(i = 0; i < numberOfDivs; i++){
    gridItem[i] = document.querySelector(`#item${i}`)
}

// this function generates three random numbers, from 0 to x (where x in this function equals the difficulty-dependent number of divs)
// the first random number generated corresponds to random div no. 1
// the second random number generated corresponds to random div no. 2
// the third random number generated corresponds to a numbered classname which corresponds to the memory-card image. Because two divs must contain the same memory card, the third random number goes from 0 to x/2 
// the function will never generate the same number twice for each of the two divs, because if it did then it could happen that it randomly allocates an image to one div three times, and to another div zero times. 
// This works by adding the randomly chosen number to an exclusionarray. If exclusionarray already includes chosen number, the makeuniquerandomnumber function inside assigncolortodivs will be called again until it chooses a number not yet in the array.
// the purpose of this function is to randomly select two divs (associated with first and second random number), and to randomly select a css class responsible for the image (associated with third random number). 
// At the end of the function the random colorclass is assigned to the first random div and the second random div.
// it is called x/2 times because there are x/2 divs which each require one of the same unique colorclass. this function will be called x/2 times by a later function 
function assignColorsToDivs(numberOfDivs){

    // generate first number which is associated with a div
    let randomDivNumber1 = Math.floor(Math.random() * numberOfDivs);
    
    function makeUniquerandomDivNumber1(x){
        randomDivNumber1 = Math.floor(Math.random() * x)
    return randomDivNumber1;
    }
    makeUniquerandomDivNumber1(numberOfDivs);

    while(exclusionArray1.includes(randomDivNumber1)){
        makeUniquerandomDivNumber1(numberOfDivs)
    }
    exclusionArray1.push(randomDivNumber1) 

    // generate second number which is associated with a second div
    let randomDivNumber2 = Math.floor(Math.random() * numberOfDivs);

    function makeUniquerandomDivNumber2(x){
        randomDivNumber2 = Math.floor(Math.random() * x)
    return randomDivNumber2;
    }
    makeUniquerandomDivNumber2(numberOfDivs);

    while(exclusionArray1.includes(randomDivNumber2)){
        makeUniquerandomDivNumber2(numberOfDivs)
    }
    exclusionArray1.push(randomDivNumber2) 

    // generate third number which is associated with a class, which will eventually refer to a memory card image
    let randomCardNumber = Math.floor(Math.random() * 15);

    function makeUniqueRandomCardNumber(){
        randomCardNumber = Math.floor(Math.random() * 15)
    return randomCardNumber;
    }
    makeUniqueRandomCardNumber();

    while(exclusionArray2.includes(randomCardNumber)){
        makeUniqueRandomCardNumber()
    }
    exclusionArray2.push(randomCardNumber) 

    // assign the randomly chosen colorclass to the randomly chosen divs
    gridItem[randomDivNumber1].classList.add(`class${randomCardNumber}`)
    gridItem[randomDivNumber2].classList.add(`class${randomCardNumber}`)
}

// this function calls assigncolortodivs function (above) x/2 amount of times
// x equals the number of divs
function assignColorXTimes(x){
    for(i = 0; i < x/2; i++){
        assignColorsToDivs(x)
    }
}
assignColorXTimes(numberOfDivs)

// event listeners are set for each div (for each "memory card")
for(i = 0; i < numberOfDivs; i++){
    gridItem[i].addEventListener(`click`, validator);
    gridItem[i].addEventListener(`click`, revealColor);
    gridItem[i].addEventListener(`click`, logChosenCard);
    gridItem[i].addEventListener(`click`, debugFunction);
    gridItem[i].addEventListener(`click`, checkForAmountOfRevealedCards);
}

// this function validates whether a clicked card is already stored in the cardtracker array. 
// if so, variable skip is set to true, this value will be checked in other eventlistener functions, and if true the functions will be skipped. 
// this to prevent double-clicks on the same card to be registered as two clicks on two different cards.
let skip = false
function validator(){
    if(cardTracker.includes(this)){
        skip = true;
    } else {
        skip = false
    }
    return skip;
}

// each div is set to have two background images
// the first background image is just a white card, the second background image is the actual card the player must remember upon revealing it. The name of the second background image is the exact same as the classname. So "class1" will have "class1.jpg"
// this function is called on click event and adjusts the css style such as to display the second background image (the actual memory card image)
function revealColor(){
    if(localStorage.selectedTheme === "animals"){
    let x = this.className;
    this.style.backgroundImage = `url(img/animalcards/${x}.jpg)`; 
} else if(localStorage.selectedTheme === "nature"){
    let x = this.className;
    this.style.backgroundImage = `url(img/naturecards/${x}.jpg)`; 
}
}

// the following functions serve to limit the player such that he/she can only reveal two cards simultaneously.
// the functions are called on click event.

// This function adds the selected div to an array. The point of this is that if the array length > 2, another function can check if the two cards are equal. 
// after pushing item in array, this function also contains an if statement which checks if the second div that has been clicked is actually a different div (instead of an accidental doubleclick). 
// It does so by comparing the id of each array item (every div has a unique id). (reason: there was an obvious bug where if a card was accidentally double-clicked, it would be pushed in array twice, and stay "turned", because it was identified as being a same-of-a-kind card)
// When the array length >= 2 (meaning: when a third card is clicked), and if it is true that the id's of the first two clicked divs are the same, it commands the cards to go back to "white" and empties the entire array.
// So the whole "if"-statement handles the double-click bug.
let cardTracker = [];
function logChosenCard(){
    if (skip === true) return
    else 
    cardTracker.push(this);
    if((cardTracker.length >= 2) && (cardTracker[0].id === cardTracker[1].id || cardTracker[1].id === cardTracker[2].id)){   
        cardTracker[0].style.backgroundImage = `url(img/F8F8FF.png)`;
        cardTracker[1].style.backgroundImage = `url(img/F8F8FF.png)`;
        cardTracker.length = 0;
    }   
    return cardTracker;
}


// this function is the fourth and last function called on click event.
// when two cards are turned, and they pass the if statement of the above function, and a third one is clicked, it checks if the first two turned cards are the same by calling the checkforwin function.
function checkForAmountOfRevealedCards(){
    if(cardTracker.length > 2){
        checkForWin();                     // this function checks if the two selected divs stored in cardTracker array are the same
        cardTracker.shift();
        cardTracker.shift();
    }
    return cardTracker;
}

// this function makes it such that if two cards of the same kind are turned, they remain turned
// the function is called in the checkforamountofrevealedcards function
// it works by comparing the background image values of the two first divs stored in the cardTracker array
// if they match, event listeners are removed and the background image is set to the actual card.
// if they dont match, the background image is set to the white card (meaning, the images become invisible again) 
let counter = 0;
function checkForWin(){
    let y = cardTracker[0].className;
    let z = cardTracker[1].className;

    if (window.getComputedStyle(cardTracker[0], null).getPropertyValue("background-image") === 
            window.getComputedStyle(cardTracker[1], null).getPropertyValue("background-image")){
        
        cardTracker[0].removeEventListener('click', debugFunction)
        cardTracker[0].removeEventListener('click', logChosenCard);
        cardTracker[0].removeEventListener('click', checkForAmountOfRevealedCards);
        if(localStorage.selectedTheme === 'animals'){
            cardTracker[0].style.backgroundImage = `url(img/animalcards/${y}.jpg)`;
        } else if(localStorage.selectedTheme === 'nature'){
            cardTracker[0].style.backgroundImage = `url(img/animalcards/${y}.jpg)`;
        }
        cardTracker[1].removeEventListener('click', debugFunction)
        cardTracker[1].removeEventListener('click', logChosenCard);
        cardTracker[1].removeEventListener('click', checkForAmountOfRevealedCards);
        if(localStorage.selectedTheme === 'nature'){
            cardTracker[0].style.backgroundImage = `url(img/naturecards/${y}.jpg)`;
        } else if(localStorage.selectedTheme === 'nature'){
            cardTracker[0].style.backgroundImage = `url(img/naturecards/${y}.jpg)`;
        }

        counter++
        
    } else {
        cardTracker[0].style.backgroundImage = `url(img/F8F8FF.png)`;
        cardTracker[1].style.backgroundImage = `url(img/F8F8FF.png)`;
    }
    return counter;
}

function debugFunction(){
    if (counter >= ((numberOfDivs/2)-1)){
        counter++
    }
    checkForGameOver();
    return counter;
}

function checkForGameOver(){
    if(counter === (numberOfDivs/2)){
        stopTheClock = "stop time";
        // localStorage.clear();
        sessionStorage.setItem('runtheclock', stopTheClock)
    } else return
}