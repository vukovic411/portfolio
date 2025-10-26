'use strict';

const rollDice = document.querySelector('.btn--roll');
const picture = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const currentResultPlayer0 = document.querySelector('#current--0');
const currentResultPlayer1 = document.querySelector('#current--1');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
let activePlayer = 0;
let brojac = 0;
rollDice.addEventListener('click', () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  picture.src = `pngPig/dice-${dice}.png`;

  if (dice !== 1) {
    brojac += dice;
    document.querySelector(`#current--${activePlayer}`).textContent = brojac;
  } else {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    brojac = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;

    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

let scores = [0, 0];

btnHold.addEventListener('click', () => {
  scores[activePlayer] += brojac;

  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnHold.disabled = true;
    rollDice.disabled = true;
  } else {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    brojac = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

btnNewGame.addEventListener('click', () => {
  brojac = 0;

  currentResultPlayer0.textContent = 0;
  currentResultPlayer1.textContent = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  scores[(0, 0)];
  activePlayer = 0;
  btnHold.disabled = false;
  rollDice.disabled = false;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});
