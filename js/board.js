function initBoard()
{
    let board = new Array(8).fill(0).map(() => new Array(8).fill(0));
    return board;
}
module.exports = initBoard;