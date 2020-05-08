'use strict';

let game_mode = -1;

let onTurn = -1;

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
      if (game_mode === 1) {
        announce_winner(score(gamePlan));
        pc_decide();
      }
    }
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
  const cross_possible_patterns = test_all_patterns(1);
  const circle_possible_patterns = test_all_patterns(-1);
  if (!cross_possible_patterns.includes('true') && !circle_possible_patterns.includes('true')) {
    return 10;
  }
}

const announce_winner = (index) => {
  if (index) {
    const game_status_elm = document.querySelector('.game-status');
    game_status_elm.classList.add('end--game');
    if (index === 1 || index === -2) {
      game_status_elm.textContent = 'Zvitezil krizek';
    } else if (index === -1 || index === 2) {
      game_status_elm.textContent = 'Zvitezilo kolecko';
    } else if (index === 10) {
      game_status_elm.textContent = 'Remiza';
    }
  }
}

const generate_random_index = (length) => {
  return Math.floor(Math.random() * length);
}

const test_pattern = (pattern, sign) => {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === 1) {
      if (gamePlan[i] === -sign) {
        return false;
      }
    }
  }
  return true;
}

const test_all_patterns = (sign) => {
  let possible_patterns = "";
  for (let i = 0; i < patterns.length; i++) {
    possible_patterns += test_pattern(patterns[i], sign);
  }
  return possible_patterns;
}

const find_winning_pattern = (gamePlan, sign) => {
  for (let j = 0; j < patterns.length; j++) {
    let sum = 0;
    if (test_pattern(patterns[j], sign)) {
      for (let i = 0; i < gamePlan.length; i++) {
        sum += gamePlan[i] * patterns[j][i];
      }
      if (sum === 3 * sign) {
        return patterns[j];
      }
    }
  }
}
let pc_pattern = patterns[generate_random_index(23)];

const pc_decide = () => {
  const cross_possible_patterns = test_all_patterns(1);
  const winnning_pattern = find_winning_pattern(gamePlan, 1);
  if (cross_possible_patterns.includes('true')) {
    if (winnning_pattern) {
      pc_pattern = winnning_pattern;
    };
    while (!test_pattern(pc_pattern, 1)) {
      pc_pattern = patterns[generate_random_index(23)];
    };
    console.log(pc_pattern);
  }
  const losing_pattern = find_winning_pattern(gamePlan, -1);
  let pattern_to_play = '';
  if (winnning_pattern) {
    pattern_to_play = winnning_pattern;
  } else if (losing_pattern) {
    pattern_to_play = losing_pattern;
  } else {
    pattern_to_play = pc_pattern;
  }
  pc_play(pattern_to_play);
}


const pc_play = (pattern_to_play) => {
  for (let i = 0; i < pattern_to_play.length; i++) {
    if (pattern_to_play[i] === 1) {
      if (gamePlan[i] === 0) {
        gamePlan[i] = 1;
        onTurn = -1;
        const square_elm = document.querySelector(`.square:nth-of-type(${i + 1})`);
        square_elm.classList.add('square--cross');
        return null;
      }
    }
  }
  for (let i = 0; i < gamePlan.length; i++) {
    if (gamePlan[i] === 0) {
      gamePlan[i] = 1;
      onTurn = -1;
      const square_elm = document.querySelector(`.square:nth-of-type(${i + 1})`);
      square_elm.classList.add('square--cross');
      return null;
    }
  }
}

const refresh_game = () => {
  gamePlan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  onTurn = -1;
  for (let i = 0; i < gamePlan.length; i++) {
    squares[i].classList.remove('square--cross', 'square--circle');
  }
}

const change_mode = () => {
  refresh_game();
  if (game_mode === 1) {
    game_mode = -1;
    document.querySelector('#mode').textContent = 'PC'
  } else {
    game_mode = 1;
    pc_decide();
    document.querySelector('#mode').textContent = 'Player'
  }
}


document.querySelector('#refresh').addEventListener('click', refresh_game);
document.querySelector('#mode').addEventListener('click', change_mode);

