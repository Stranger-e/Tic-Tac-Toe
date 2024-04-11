const createGameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const displayGameboard = () => {
        console.log('New Board');
        for (let i = 0; i < 9; i += 3) {
            console.log(gameboard.slice(i, i + 3).join(' | '));
            if (i < 6) console.log('---------');
        }
    };

    const resetGameboard = () => {
        gameboard = ['','','','','','','','',''];
    };

    return {displayGameboard, resetGameboard};
})();

const Player = (name, symbol) => {
    return{name, symbol};
}

let player1 = Player('Oloo', 'O');
let player2 = Player('Max', 'X')
console.log(player1);
console.log(player2);

const gameFlow = (() => {
    const players = [];
    let currentPlayerIndex = 0;
});
