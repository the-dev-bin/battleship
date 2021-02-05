/*const sum = require('../board');
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});*/
const initBoard = require('../board');
test('Creates an empty board', () => {
    expect(initBoard()).toStrictEqual([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]])
})