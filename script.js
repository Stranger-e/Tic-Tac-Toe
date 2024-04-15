const createGameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const displayGameboard = () => {
    console.log('New Board');
    for (let i = 0; i < 9; i += 3) {
      console.log(gameboard.slice(i, i + 3).join(' | '));
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

    for (let combo of winningCombos) {
      if (combo.every((index) => gameboard[index] === symbol)) {
        return true;
      }
    }

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
    console.log('Current player index:', currentPlayerIndex);
    console.log('Players length:', players.length);
    return players[currentPlayerIndex]
      ? players[currentPlayerIndex].symbol
      : '';
  };

  const makeMove = (position) => {
    if (
      position >= 0 &&
      position < 9 &&
      createGameboard.gameboard[position] === ''
    ) {
      createGameboard.gameboard[position] = getPlayerSymbol();
      switchPlayer();
      createGameboard.displayGameboard();
      gameboardArray = [...createGameboard.gameboard];
      displayController.renderGameboard(gameboardArray, containerId);

      if (createGameboard.checkWinner(getPlayerSymbol())) {
        document.getElementById(
          'results'
        ).innerText = `Player ${getPlayerSymbol()} wins`;
        createGameboard.resetGameboard();
      } else if (createGameboard.isBoardFull()) {
        document.getElementById('results').innerText = 'It is a tie';
        createGameboard.resetGameboard();
      }
    } else {
      console.log('Invalid move');
    }
  };

  return { addPlayer, makeMove };
})();

const displayController = {
  renderGameboard: function (conatinerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    gameboardArray.forEach((cellValue, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = cellValue;
      container.appendChild(cell);

      cell.addEventListener('click', () => {
        if (gameboardArray[index] === '') {
          gameFlow.makeMove(index);
        } else {
          console.log('cell already occupied');
        }
      });
    });
  },
};

let gameboardArray = ['', '', '', '', '', '', '', '', ''];
const containerId = 'gameboardContainer';

displayController.renderGameboard(gameboardArray, containerId);
