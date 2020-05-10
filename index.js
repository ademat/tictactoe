'use strict';

//promena znaci, zdali hrajeme s PC (1) nebo s jinym hracem (-1)
let game_mode = -1;
//promena znaci, kdo je na rade. Kolecko (-1), krizek (1)
let onTurn = -1;
//promena uchovava informaci o stavu hry
let gamePlan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//funkce, ktera se pousti pri kliknuti na libovolne pole
//je-li pole prazdne, vlozi do nej hodnotu a vykresli znak hrace
//hrajeme-li proti pocitaci, spusti se rozhodovaci algoritmus
//v pripade, ze je pole jiz zabrane, vyskoci alert
const squareClick = (event) => {
  const index = event.target.dataset.index;
  if (gamePlan[index] === 0) {
    if (onTurn === 1) {
      gamePlan[index] = 1;
      onTurn = -1;
      event.target.classList.add('square--cross');
      if (game_mode === 1) {
        announce_winner(score());
        if (score) {
          return null;
        }
        pc_decide();
      }
    } else {
      gamePlan[index] = -1;
      onTurn = 1;
      event.target.classList.add('square--circle');
      if (game_mode === 1) {
        announce_winner(score());
        if (score) {
          return null;
        }
        pc_decide();
      }
    }
    announce_winner(score());
  } else {
    alert('Vyberte prazdne pole.')
  }
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', squareClick);
}

//pole poli se vsemi moznymi vyhernimi vzory
const patterns =
  [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1], [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]]

//funkce, ktera prochazi vsemi vyhernimi vzory a porovnava je s aktualnim stavem hry
//pokud skalarni soucin vychazi 4, vraci hodnotu 1 (vyhral krizek)
//pokud skalarni soucin vychazi -4, vraci hodnotu -1 (vyhral krizek)
//funkce rovnez testuje, jestli oba hraci maji sanci vyhrat
//pokud ne, vraci hodnotu 10(remiza) 

const score = () => {
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

const game_status_elm = document.querySelector('.game-status');

//funkce bere jako svuj vstup vysledek funkce score
//ucelem je graficky znazornit vysledek hry
const announce_winner = (index) => {
  if (index) {
    game_status_elm.classList.add('end--game');
    if (index === 1) {
      game_status_elm.textContent = 'Zvitezil krizek';
    } else if (index === -1) {
      game_status_elm.textContent = 'Zvitezilo kolecko';
    } else if (index === 10) {
      game_status_elm.textContent = 'Remiza';
    }
  }
}

//funkce generujici nahodna cisla od nuly do length-1
const generate_random_index = (length) => {
  return Math.floor(Math.random() * length);
}

//funkce testuje, zda-li pocitac muze vyhrat s danym vyhernim vzorem
//jako vstup se zadava vyherni vzor k otestovani (pattern) a znak, za ktery pocitac hraje (sign)
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

//funkce testuje vsechny vyherni vzory z pohledu daneho hrace a vraci string tvoreny hodnotami true a false
//obsahuje-li hodnotu true, hrac ma sanci vyhrat
//jako vstup bere znak, za ktery hrac hraje (1-krizek, -1 kolecko)
const test_all_patterns = (sign) => {
  let possible_patterns = "";
  for (let i = 0; i < patterns.length; i++) {
    possible_patterns += test_pattern(patterns[i], sign);
  }
  return possible_patterns;
}

//vstup - znak, za ktery hrac hraje (1-krizek, -1 kolecko)
//funkce prochazi vsechny vyherni vzory a hleda takovy, ktery je stale mozne zahrat a zaroven v nem chybi jen jeden znak
//pokud takovy vzor najde, vrati ho
const find_winning_pattern = (sign) => {
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

//pocitac zacina hru tim, ze si vybere nahodny vyherni vzor
let pc_pattern = patterns[generate_random_index(23)];

//rozhodovaci algoritmus pocitace
//nejprve zjisti, zdali existuji vzory, se kterymi muze vyhrat
//pote zjisti, jestli mu v nejakem vyhernim vzoru nechybi posledni znak, jestli ano, ulozi si ho do vzoru, ktery bude hrat
//jestlize ne, otestuje vzor, ktery hral v minulem kole. V pripade, ze jiz neni hratelny, vygeneruje si novy
//dale testuje, jestli souper nema vyherni vzor, ve kterem mu chybi posledni znak
//primarne hraje svuj vyherni vzor, kdyz neni, tak brani souperi, kdyz neni potreba branit, hraje svuj nahodne vygenerovany vzor
const pc_decide = () => {
  const all_possible_patterns = test_all_patterns(onTurn);
  const winnning_pattern = find_winning_pattern(onTurn);
  if (all_possible_patterns.includes('true')) {
    if (winnning_pattern) {
      pc_pattern = winnning_pattern;
    };
    while (!test_pattern(pc_pattern, onTurn)) {
      pc_pattern = patterns[generate_random_index(23)];
    };
  }
  const losing_pattern = find_winning_pattern(-onTurn);
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

//funkce bere jako vstup vzor, ktery generuje funkce pc_decide
//tento vzor pocitac prochazi a vybere vsechna volna pole, ze kterych nasledne jedno nahodne vybere a zahraje
//v pripade, ze pocitac nema zadny potencialne vyherni vzor a ani nemusi branit souperi, vybere si nahodne volne pole
const pc_play = (pattern_to_play) => {
  let possible_squares_to_play = [];
  for (let i = 0; i < pattern_to_play.length; i++) {
    if (pattern_to_play[i] === 1) {
      if (gamePlan[i] === 0) {
        possible_squares_to_play.push(i);
      }
    }
  }
  if (possible_squares_to_play.length !== 0) {
    const square_to_play = possible_squares_to_play[generate_random_index(possible_squares_to_play.length)];
    gamePlan[square_to_play] = onTurn;
    const square_elm = document.querySelector(`.square:nth-of-type(${square_to_play + 1})`);
    if (onTurn === 1) {
      square_elm.classList.add('square--cross');
    } else {
      square_elm.classList.add('square--circle');
    };
    onTurn = -onTurn;
    return null
  }
  for (let i = 0; i < gamePlan.length; i++) {
    if (gamePlan[i] === 0) {
      gamePlan[i] = onTurn;
      const square_elm = document.querySelector(`.square:nth-of-type(${i + 1})`);
      if (onTurn === 1) {
        square_elm.classList.add('square--cross');
      } else {
        square_elm.classList.add('square--circle');
      }
      onTurn = -onTurn;
      return null;
    }
  }
}

//funkce cisti herni plan i jeho graficke zobrazeni
const refresh_game = () => {
  gamePlan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  game_status_elm.classList.remove('end--game');
  game_status_elm.textContent = '';
  for (let i = 0; i < gamePlan.length; i++) {
    squares[i].classList.remove('square--cross', 'square--circle');
  }
  if (document.querySelector('#sign').textContent === 'O') {
    onTurn = -1;
  } else {
    onTurn = 1;
  }
  if (game_mode === 1) {
    pc_pattern = patterns[generate_random_index(23)]
    pc_decide();
  }
}

//funkce pusti refresh_game a zmeni herni mod 
//1 = hra proti pocitaci, -1 = hra proti jinemu hraci
const change_mode = () => {
  if (game_mode === 1) {
    game_mode = -1;
    document.querySelector('#mode').textContent = 'Player'
  } else {
    game_mode = 1;
    document.querySelector('#mode').textContent = 'PC'
  }
  refresh_game();
}

//funkce pusti refresh_game a zmeni znak, za ktery hraje hrac 1
const change_sign = () => {
  const signElm = document.querySelector('#sign');
  if (signElm.textContent === 'X') {
    signElm.textContent = 'O';
  } else {
    signElm.textContent = 'X';
  }
  refresh_game();
}


document.querySelector('#refresh').addEventListener('click', refresh_game);
document.querySelector('#mode').addEventListener('click', change_mode);
document.querySelector('#sign').addEventListener('click', change_sign);

