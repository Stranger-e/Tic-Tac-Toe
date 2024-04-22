let gameStarted = false;

const createGameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const displayGameboard = () => {
    for (let i = 0; i < 9; i += 3) {
      if (i < 6) console.log('---------');
    }
  };

  const resetGameboard = () => {
    gameboard = ['', '', '', '', '', '', '', '', ''];
  };

  const checkWinner = (symbol) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const symbols = createGameboard.gameboard;

    for (let combo of winningCombos) {
      const [a, b, c] = combo;

      console.log('Combo: ', combo);
      console.log('Symbols: ', symbols);

      console.log('Comparing: ', symbols[a], symbols[b], symbols[c]);
      if (
        symbols[a] === symbol &&
        symbols[b] === symbol &&
        symbols[c] === symbol
      ) {
        console.log('Is winner true');
        return true;
      }
    }
    console.log('Is winner false');
    return false;
  };

  const isBoardFull = () => {
    return !gameboard.includes('');
  };

  return {
    displayGameboard,
    resetGameboard,
    checkWinner,
    isBoardFull,
    gameboard,
  };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

let player1;
let player2;

const startGame = () => {
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;

  player1 = Player(player1Name || 'Player 1', 'O');
  player2 = Player(player2Name || 'Player 2', 'X');

  gameFlow.addPlayer(player1);
  gameFlow.addPlayer(player2);

  gameStarted = true;

  resetGame();
};

const resetGame = () => {
  createGameboard.resetGameboard();
  displayController.renderGameboard(createGameboard.gameboard);
  document.getElementById('results').innerText = '';
};

const gameFlow = (() => {
  const players = [];
  let currentPlayerIndex = 0;

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const addPlayer = (player) => {
    players.push(player);
    console.log('Player added:', player);
    console.log('Players:', players);
  };

  const getPlayerSymbol = () => {
    return players[currentPlayerIndex]
      ? players[currentPlayerIndex].symbol
      : '';
  };

  const makeMove = (position) => {
    if (!gameStarted) {
      console.log('Game has not started yet');
      return;
    }
    const currentPlayerSymbol = getPlayerSymbol();
    console.log('Player symbol', currentPlayerSymbol);
    if (
      position >= 0 &&
      position < 9 &&
      createGameboard.gameboard[position] === ''
    ) {
      createGameboard.gameboard[position] = currentPlayerSymbol;
      switchPlayer();
      displayController.renderGameboard(createGameboard.gameboard);

      if (createGameboard.checkWinner(currentPlayerSymbol)) {
        console.log(`Player ${currentPlayerSymbol}`);
        document.getElementById(
          'results'
        ).innerText = `Player ${currentPlayerSymbol} wins`;
        createGameboard.resetGameboard();
      } else if (createGameboard.isBoardFull()) {
        document.getElementById('results').innerText = 'It is a tie';
        console.log('it is a tie');
        createGameboard.resetGameboard();
      }
    } else {
      console.log('Invalid move');
    }
  };

  return { addPlayer, makeMove };
})();

const displayController = {
  renderGameboard: function (gameboard) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    gameboard.forEach((cellValue, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = cellValue;
      container.appendChild(cell);

      cell.addEventListener('click', () => {
        if (gameboard[index] === '') {
          gameFlow.makeMove(index);
        } else {
          console.log('cell already occupied');
        }
      });
    });
  },
};

const containerId = 'gameboardContainer';

displayController.renderGameboard(createGameboard.gameboard, containerId);
