const createGameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const displayGameboard = () => {
        console.log('New Board');
        for (let i = 0; i < 9; i += 3) {
            console.log(board.slice(i, i + 3).join(' | '));
            if (i < 6) console.log('---------');
        }
    };

    const resetGameboard = () => {
        gameboard = ['','','','','','','','',''];
    };

    return {displayGameboard, resetGameboard};
})();