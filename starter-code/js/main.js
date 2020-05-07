/*------Constants------*/

const difficulty = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 15
}

/*------Variables------*/

let winTime, seconds, matchCount, card1Val, card1Idx, card2Val, card2Idx, turn, timer, deck;
let cardsInPlay = [];

/*------Cached Element References------*/

const resetDiv = document.getElementById('resetDiv');
const difficultyButtonsDiv = document.getElementById('difficultyButtons');
const messageEl = document.getElementById('message');
const playArea = document.getElementById('playArea');
const resetBtn = document.getElementById('resetButton');

/*------Event Listeners------*/

playArea.addEventListener('click', function() {

})

resetBtn.addEventListener('click', function() {
    difficultyButtonsDiv.setAttribute("class", "");
    resetDiv.setAttribute("class", "hidden");
})

difficultyButtonsDiv.addEventListener('click', function(evt) {
    if (evt.target.innerText) {
        difficultyButtonsDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
    }
})


/*------Functions------*/

