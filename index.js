'use strict';

let onTurn = 1;

let gamePlan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const squareClick = (event) => {
  const index = event.target.dataset.index;
  if (gamePlan[index] === 0) {
    if (onTurn === 1) {
      gamePlan[index] = 1;
      onTurn = -1;
      event.target.classList.add('square--cross');
    } else {
      gamePlan[index] = -1;
      onTurn = 1;
      event.target.classList.add('square--circle');
    }
    console.log('Ahoj' + gamePlan);
    announce_winner(score(gamePlan));
  } else {
    alert('Vyberte prazdne pole.')
  }
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', squareClick);
}

const patterns =
  [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1], [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]]

const score = (gamePlan) => {
  for (let j = 0; j < patterns.length; j++) {
    let sum = 0;
    for (let i = 0; i < gamePlan.length; i++) {
      sum += gamePlan[i] * patterns[j][i];
    }
    if (sum === 4) {
      return 1;
    }
    if (sum === -4) {
      return -1;
    }
  }
  console.log(gamePlan);
}

const announce_winner = (index) => {
  if (index) {
    const game_status_elm = document.querySelector('.game-status');
    game_status_elm.classList.add('end--game');
    if (index === 1) {
      game_status_elm.textContent = 'Zvitezil krizek';
    } else if (index === -1) {
      game_status_elm.textContent = 'Zvitezilo kolecko';
    }
  }
}

const generate_random_index = () => {
  return Math.floor(Math.random() * 16);
}

const play = () => {
  let i = true;
  while (i) {
    const index = generate_random_index();
    if (gamePlan[index] === 0) {
      gamePlan[index] = 1;
      onTurn = -1;
      const square_elm = document.querySelector(`.square:nth-of-type(${index + 1})`);
      square_elm.classList.add('square--cross');
      i = false;
    }
  }
}