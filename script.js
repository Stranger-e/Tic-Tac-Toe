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

let player1 = Player('Oloo', 'O');
let player2 = Player('Max', 'X');
console.log(player1);
console.log(player2);

const gameFlow = (() => {
  const players = [];
  let currentPlayerIndex = 0;

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const addPlayer = (player) => {
    players.push(player);
  };

  const getPlayerSymbol = () => {
    return players[currentPlayerIndex].symbol;
  };

  // const startGame = () => {
  //   createGameboard.resetGameboard();
  //   createGameboard.displayGameboard();
  //  };

  const makeMove = (position) => {
    if (
      position >= 0 &&
      position < 9 &&
      createGameboard.gameboard[position] === ''
    ) {
      createGameboard.gameboard[position] = getPlayerSymbol();
      switchPlayer();
      createGameboard.displayGameboard();

      if (createGameboard.checkWinner(getPlayerSymbol())) {
        console.log(`Player ${getPlayerSymbol()} wins`);
        createGameboard.resetGameboard();
      } else if (createGameboard.isBoardFull()) {
        console.log('It is a tie');
        createGameboard.resetGameboard();
      }
    } else {
      console.log('Invalid move');
    }
  };

  return { addPlayer, makeMove };
})();

const displayController = {
  renderGameboard: function (gameboardArray, conatinerId) {
    const container = document.getElementById(conatinerId);
    container.innerHTML = '';

    gameboardArray.forEach((cellValue, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = cellValue;
      container.appendChild(cell);

      cell.addEventListener('click', () => {
        gameFlow.makeMove(index);
        this.renderGameboard(gameboardArray, conatinerId);
      });
    });
  },
};

const gameboardArray = ['X', '', 'O', '', 'X', '', '', 'O', ''];
const containerId = 'gameboardContainer';
displayController.renderGameboard(gameboardArray, containerId);
