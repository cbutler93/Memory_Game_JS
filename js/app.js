/* TODO:
1) Clean up code.
*/

let totalMatches, cardsPicked, totalMoves, timer, totalTime, starRating, gameOver;
const deck = document.querySelector('ul.deck');
const restart = document.querySelector('.restart');
const playAgain = document.querySelector('.play-again');
const gameStats = document.querySelector('.finished');

// Create function to scramble initialized cards array
function randomizeArray(arr) {
     const randIndices = []; // Array to hold random indices selected.
     const randArray = []; // Array to hold elements from random array indices.
     while (randArray.length < 16) {
          const randIndex = Math.floor(Math.random() * arr.length);
          if (randIndices.includes(randIndex)) {
               continue;
          } else {
               randIndices.push(randIndex)
               randArray.push(arr[randIndex]);
          }
     }
     return randArray;
};

function initCards() {
     // Initialize Card Array
     const initCards = [
          'fa-diamond', 'fa-diamond',
          'fa-paper-plane-o', 'fa-paper-plane-o',
          'fa-anchor', 'fa-anchor',
          'fa-bolt', 'fa-bolt',
          'fa-cube', 'fa-cube',
          'fa-leaf', 'fa-leaf',
          'fa-bicycle', 'fa-bicycle',
          'fa-bomb', 'fa-bomb'
     ];
     // Randomize cards for start of game.
     const newCards = randomizeArray(initCards);
     // Initialize game by hiding all cards and adding a random icon to each.
     const cardElements = document.querySelectorAll('.card');
     cardElements.forEach(el => el.classList.remove('open', 'match', 'show'));
     const cardSymbols = document.querySelectorAll('.card i');
     cardSymbols.forEach(el => {
         const curIcon = el.classList[1];
         el.classList.remove(curIcon);
         const newIcon = newCards.pop();
         el.classList.add(newIcon);
     });
};

function revealCard(el) {
    el.classList.add('open', 'show');
};

function hideCards(...cards) {
    for (const card of cards) {
        card.classList.remove('open', 'show', 'wrong');
        card.style.animationName = 'none';
    }
};

function checkGameOver(matches) {
    if (matches === 8) { // There are 16 cards, 8 two-card matches means all cards matched.
        gameOver = true;
        gameStats.style.display = 'inline-block';
        gameStats.classList.add('slide-in');
        const timeStats = document.querySelector('.total-time');
        const starsEarned = document.querySelector('.star-rating');
        timeStats.textContent = `It took you ${totalTime} to complete the game!`;
        starsEarned.textContent = `You finished the game with a ${starRating}-star rating!`;
        clearInterval(timer);
    }
};

function setClock() {
    const startMessage = document.querySelector('p.start');
    startMessage.classList.add('shrink');
    const startTime = new Date().getTime();
    const minuteSpan = document.querySelector('span.minutes');
    const secondSpan = document.querySelector('span.seconds');
    const timer = setInterval(() => {
        const curTime = new Date().getTime();
        const totalSeconds = ((curTime - startTime) / 1000).toFixed(0);
        const seconds = totalSeconds < 60 ? totalSeconds : totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);
        secondSpan.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;
        minuteSpan.textContent = minutes < 10 ? `0${minutes}` : `${minutes}`;
        totalTime = `${minutes} ${minutes !== 1 ? `Minutes` : `Minute`} and ${seconds} ${seconds !== 1 ? `Seconds` : `Second`}`;
    }, 1000);
    return timer;
}

function resetClock() {
    const startMessage = document.querySelector('p.start');
    startMessage.classList.remove('shrink');
    const timerElements = document.querySelectorAll('.clock span');
    timerElements.forEach(el => el.textContent = "00");
    clearInterval(timer);
}

function resetGame() {
    cardsPicked = [];
    totalMoves = 0;
    starRating = 3;
    totalMatches = 0;
    gameOver = false;
    updateMoveDisplay();
    initCards();
    resetClock();
    gameStats.style.display = 'none';
    gameStats.classList.remove('slide-in');
}

function checkCards(cards) {
    const firstIcon = cards[0];
    const secondIcon = cards[1];
    const firstCard = firstIcon.parentNode;
    const secondCard = secondIcon.parentNode;
    if (firstIcon.classList[1] === secondIcon.classList[1]) {
        /* Select the Icon's parent node (the card li) and adjust classes accordingly. */
        for (card of [firstCard, secondCard]) {
            card.classList.add('match');
            card.style.animationIterationCount = '1';
            card.style.animationTimingFunction = 'ease-in-out';
            card.style.animationDuration = '0.3s';
            card.style.animationName = 'match';
        }
        totalMatches += 1;
        checkGameOver(totalMatches);
    } else {
        // Keep both flipped cards shown for 1 second, then hide them.
        for (card of [firstCard, secondCard]) {
            card.classList.add('wrong');
            card.style.animationName = 'wiggle';
        }
        setTimeout(hideCards, 1000, firstCard, secondCard);
    }
};

function updateMoveDisplay() {
    const moves = document.querySelector('.moves');
    if (totalMoves > 0) { // If the function call isn't to reset the moves/star ratings.
        moves.textContent = `${totalMoves} Moves`;
        /* After a certain number of moves, switch out solid stars with outlined (hollow) stars. */
        if (totalMoves === 25) {
            const thirdStar = document.querySelectorAll('.fa-star')[2];
            thirdStar.classList.replace('fa-star', 'fa-star-o');
            starRating = 2;
        } else if (totalMoves === 40) {
            const secondStar = document.querySelectorAll('.fa-star')[1];
            secondStar.classList.replace('fa-star', 'fa-star-o');
            starRating = 1;
        }
    } else if (totalMoves === 0) { // If the function call is from resetGame().
        moves.textContent = `${totalMoves} Moves`;
        const lostStars = document.querySelectorAll('.fa-star-o');
        if (lostStars.length) {
            lostStars.forEach(star => star.classList.replace('fa-star-o', 'fa-star'));
        }
    }
};

// Add event listener for card selections.
deck.addEventListener('click', (e) => {
    if (totalMoves === 0) {
        timer = setClock();
    }

    if (gameOver) {
        resetGame();
        timer = setClock();
    }
    // Don't do anything if a card (li) wasn't clicked.
    if (e.target.nodeName !== 'LI') return;
    // If a card was clicked, check if it was already opened.
    const targetCard = e.target;
    if (targetCard.classList.contains('open') || targetCard.classList.contains('show')) {
        alert('Card already open. Please choose another!');
    } else {
        /*If the target card isn't revealed, reveal it and add the card's child icon to the picked cards array. Increment total game moves. */
        revealCard(targetCard);
        cardsPicked.push(targetCard.querySelector('i'));
        totalMoves += 1;
        setTimeout(updateMoveDisplay, 0);
    }
    // If two cards have been picked, check the cards for a match.
    if (cardsPicked.length === 2) {
        checkCards(cardsPicked);
        cardsPicked = [];
    }
});

// Add event listener for clicks on the reset button.
restart.addEventListener('click', resetGame);

// Add event listener for play again button.
playAgain.addEventListener('click', resetGame);

resetGame();
