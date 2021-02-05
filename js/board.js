function sum(a,b){
    return a+b;
}
function initBoard()
{
    let board = new Array(8).fill(0).map(() => new Array(8).fill(0));
    return board;
}
module.exports = initBoard;