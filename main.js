// stores all cards in a single variable; cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// move variable
let moves = 0;
let counter = document.querySelector(".moves");

// variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// variable for close icon in modal
let closeIcon = document.querySelector(".close");

// variable for modal
let modal = document.getElementById("popup-container")

// array of opened cards
var openedCards = [];

// shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (currentIndex !== 0) {
        // pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // and swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// shuffles cards when page is opened or refreshed
document.body.onload = startGame();

// replay 
function startGame(){
// stack of all cards
const stack = document.getElementById("card-stack");
// shuffles cards  
cards = shuffle(cards);
    // removes all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        stack.innerHTML = "";
        [].forEach.call(cards, function(item) {
            stack.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // resets move counter
    moves = 0;
    counter.innerHTML = moves;
    //resets timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec";
    clearInterval(interval);
}


// toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// adds opened cards and checks if cards are matched or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// executes instructions when cards are matched 
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// executes these actions when cards are not matched 
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// disables cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// enables cards but disables matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// counts the number of moves the player makes 
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    // timer starts on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}

// timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"min "+second+"sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// when all cards are matched a modal shows the number of moves the player made and the time it took the player to match all cards 
function scoreBoardModal(){
    if (matchedCard.length == 12){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // shows modal
        modal.classList.add("show");

        //shows number of moves and the time it took
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closes the modal
        closeModal();
    };
}


// onclick close icon closes modal and restarts the game
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// replay button closes modal and restarts the game
function replay(){
    modal.classList.remove("show");
    startGame();
}


// loops through all cards to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",scoreBoardModal);
};
