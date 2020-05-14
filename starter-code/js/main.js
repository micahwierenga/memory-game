/*------Constants------*/
console.log('cardz:', cardz)
const difficulty = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 15
}

/*------Variables------*/

let seconds, matchCount, card1Val, card1Idx, card2Val, card2Idx, turn, timer, deck;
let cardsInPlay = [];

/*------Cached Element References------*/

const resetDiv = document.getElementById('resetDiv');
const difficultyButtonsDiv = document.getElementById('difficultyButtons');
const messageEl = document.getElementById('message');
const playArea = document.getElementById('playArea');
const resetBtn = document.getElementById('resetButton');

/*------Event Listeners------*/

playArea.addEventListener('click', handlePick)

resetBtn.addEventListener('click', function() {
    difficultyButtonsDiv.setAttribute("class", "");
    resetDiv.setAttribute("class", "hidden");
})

difficultyButtonsDiv.addEventListener('click', function(evt) {
    if (evt.target.innerText) {
        difficultyButtonsDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
        init();
        console.log('difficulty[evt.target.innerText]:', difficulty[evt.target.innerText])
        setDifficulty(difficulty[evt.target.innerText]);
    }
})


/*------Functions------*/

function init() {
    messageEl.innerHTML = 'Please select a difficulty:'
    matchCount = 0;
    seconds = 0;
    turn = 1;
    playArea.innerHTML = '';
    cardsInPlay = [];
    deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
    clearInterval(timer);
    timer = setInterval(addSecond, 1000);
    render();
}

function addSecond() {
    seconds++;
    console.log('seconds:', seconds);
}

function setDifficulty(numCards) {
    messageEl.innerText = 'Find a match!';
    const cardsToShuffle = [];
    for(let i = 1; i <= numCards; i++) {
        const cardToAdd = deck.splice(Math.floor(Math.random() * deck.length), 1);
        cardsToShuffle.push(cardToAdd[0], cardToAdd[0]);
    }
    shuffle(cardsToShuffle);
    render();
}

function shuffle(cardsIn) {
    while(cardsIn.length) {
        const cardToShuffle = cardsIn.splice(Math.floor(Math.random() * cardsIn.length), 1);
        cardsInPlay.push({0: `${cardToShuffle[0]}`});
    }
}

function render() {
    playArea.innerHTML = '';
    cardsInPlay.forEach(function(card) {
        // 0 denotes a card face down
        if (card[0]) {
            appendCard('back-red');
        // 1 denotes a card being guessed    
        } else if (card[1]) {
            appendCard(card[1]);
        // 2 denotes a card guessed correctly    
        } else if (card[2]) {
            appendCard(card[2]);
        }
    }) 
}

function appendCard(className) {
    const appendCard = document.createElement('div');
    appendCard.className = `card large ${className}`;
    playArea.appendChild(appendCard);
}

function handlePick(evt) {
    const cardClickedIdx = Array.from(evt.target.parentNode.children).indexOf(evt.target);

    if(cardsInPlay[cardClickedIdx][0]) {
        if(turn === 1) {
            card1Val = cardsInPlay[cardClickedIdx][0];
            card1Idx = cardClickedIdx;
            cardsInPlay[cardClickedIdx] = {1: card1Val};
        } else if(turn === -1) {
            card2Val = cardsInPlay[cardClickedIdx][0];
            card2Idx = cardClickedIdx;
            cardsInPlay[cardClickedIdx] = {1: card2Val};
            setTimeout(function() {
                compareCards();
                render();
            }, 1000);
        }
    }
    turn *= -1;
    render();
}

function compareCards() {

    if(card1Val === card2Val) {
        matchCount++;
        handleCompareResults(true);
    } else {
        handleCompareResults(false);
    }

    if(matchCount === cardsInPlay.length / 2) {
        const finalTime = formatTime(seconds);
        messageEl.innerHTML = `You found all ${matchCount} matches in ${finalTime}`;
        clearInterval(timer);
    }
}

function handleCompareResults(isMatch) {
    messageEl.innerHTML = isMatch ? 'You found a match!' : 'Nope, try again!';
    cardsInPlay[card1Idx] = isMatch ? {2: card1Val} : {0: card1Val};
    cardsInPlay[card2Idx] = isMatch ? {2: card2Val} : {0: card2Val};
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}


