'use strict';

const tabla = ['', '', '', '', '', '', '', '', ''];
const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let gameActive = true;

const statusDiv = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');

const board = document.createElement('div');
board.className = 'board';
board.setAttribute('role', 'grid');
board.setAttribute('aria-label', 'Tabla X-O');

// Креирање поља
board.innerHTML = `
  <div class="cell" id="cell0" role="gridcell" tabindex="0"></div>
  <div class="cell" id="cell1" role="gridcell" tabindex="1"></div>
  <div class="cell" id="cell2" role="gridcell" tabindex="2"></div>
  <div class="cell" id="cell3" role="gridcell" tabindex="3"></div>
  <div class="cell" id="cell4" role="gridcell" tabindex="4"></div>
  <div class="cell" id="cell5" role="gridcell" tabindex="5"></div>
  <div class="cell" id="cell6" role="gridcell" tabindex="6"></div>
  <div class="cell" id="cell7" role="gridcell" tabindex="7"></div>
  <div class="cell" id="cell8" role="gridcell" tabindex="8"></div>
`;

// Додај таблу у <main>
document.querySelector('main').append(board);

// Селекција свих поља
const cells = document.querySelectorAll('.cell');

// Сви могући добитни редови
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Функција за провјеру побједника
function checkWinner() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
      gameActive = false;
      statusDiv.textContent = `Побједник је ${tabla[a]}!`;
      return;
    }
  }

  // Неријешено ако су сва поља попуњена
  if (!tabla.includes('')) {
    gameActive = false;
    statusDiv.textContent = 'Неријешено!';
  }
}

// Клик на поље
function handleClick(e) {
  const index = e.target.id.replace('cell', '');

  if (!gameActive || tabla[index] !== '') return;

  tabla[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statusDiv.textContent = `Ред је на: ${currentPlayer}`;
  }
}

// Додај слушаоце на сва поља
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Почетна порука
statusDiv.textContent = `Почиње игра — ${currentPlayer} почиње!`;

// Ресет дугме
resetBtn.addEventListener('click', () => {
  for (let i = 0; i < tabla.length; i++) tabla[i] = '';
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = player1;
  gameActive = true;
  statusDiv.textContent = `Почиње игра — ${currentPlayer} почиње!`;
});
