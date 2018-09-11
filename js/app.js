/* // TODO:
1) Initialize game by adding random class to each card.
2) Create function to reveal card on click.
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
}

// Initialize Game.
const newCards = initGame();

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
