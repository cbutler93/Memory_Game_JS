/* // TODO:
1) After checking for a card match, check if the game is over.
2) When the game is over, show the total number of guesses it took to complete the game.
3) After a certain number of guesses, adjust the star rating.
4) Make the game reset button functional.
*/

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
     const randCards = randomizeArray(initCards);
     return randCards;
};

function revealCard(el) {
    el.classList.add('open', 'show');
};

function checkCards(cards) {
    const firstIcon = cards[0].classList[1];
    const secondIcon = cards[1].classList[1];
    if (firstIcon === secondIcon) {
        /* Select the Icon's parent node (the card li) and adjust classes accordingly. */
        firstIcon.parentNode.classList.add('match');
        secondIcon.parentNode.classList.add('match');
    } else {
        firstIcon.parentNode.classList.remove('open', 'show');
        secondIcon.parentNode.classList.remove('open', 'show');
    }
    // Reset cardsPicked array after a match is checked.
    cardsPicked = [];
};

// Initialize/randomize cards for a new game.
const newCards = initCards();

// Initialize game by adding random class to each card
const cardElements = document.querySelectorAll('.card');

// Reset cards on board by removing open, match, show classes from cards.
cardElements.forEach(el => el.classList.remove('open', 'match', 'show'));

// Select all i elements, remove second class (icon), add new icon from the randomized array of icon classes.
const cardSymbols = document.querySelectorAll('.card i');
cardSymbols.forEach(el => {
    const curIcon = el.classList[1];
    el.classList.remove(curIcon);
    const newIcon = newCards.pop();
    el.classList.add(newIcon);
});

let cardsPicked = [];
let totalGuesses = 0;

// Select deck and add event listener for clicks.
const deck = document.querySelector('ul.deck');
deck.addEventListener('click', (e) => {
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
        totalGuesses += 1;
    }
    // If two cards have been picked, check the cards for a match.
    if (cardsPicked.length === 2) {
        checkCards(cardsPicked);
    }
});
