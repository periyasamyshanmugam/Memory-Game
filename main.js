var totalCardCount = 36,
    circleCount = 5;

// array to store index of cards with circle
var selectCardInd = [];

// ards wrapper div
const deck = document.getElementById("card-deck");


// @description function to shuffle cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description shuffles cards when page is refreshed / loads
document.body.onload = initGame();


// @description function to initialize cards 
function initGame(){
    let card1 = _.fill(Array(circleCount), true);
    let card2 = _.fill(Array(totalCardCount - circleCount), false);
    let cards = _.concat(card1, card2);
 
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    deck.innerHTML = "";
    selectCardInd = [];
    _.forEach(cards, (each, i) => {
        var cardElement = document.createElement('div');
        cardElement.classList.add("card");
        if (each) {
            var iconElement = document.createElement('span');
            iconElement.classList.add("innerCircle");
            cardElement.addEventListener("click", () => startGame(i));
            selectCardInd.push(i);
            cardElement.appendChild(iconElement);
            deck.appendChild(cardElement);
        } else {
            cardElement.addEventListener("click", endGame);
            deck.appendChild(cardElement);
        }
    });
}

// @description function to end game
function endGame() {
    hideCircles();
    alert("lose");
    initGame();
}

// @description function to start the game
// @param {number} clicked circle card index
function startGame(i) {
    if (selectCardInd.length === circleCount) {
        hideCircles();
    }
    _.pull(selectCardInd, i);
    if (selectCardInd.length === 0) {
        alert("won");
        circleCount++;
        initGame();
    }
}

// @description function to hide cards
function hideCircles() {
    document.querySelectorAll(".innerCircle").forEach(each => {
        each.classList.add("hide");
    });
}