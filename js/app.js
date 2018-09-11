/* // TODO:
1) Create array to hold available cards (icons/classes)
2) Create function to randomly shuffle card array.
3) Create function to reveal card on click.
*/

// Initialize card array
/* Available classes:
fa-diamond
fa-paper-plane-o
fa-anchor
fa-bolt
fa-cube
fa-leaf
fa-bicycle
fa-bomb
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
