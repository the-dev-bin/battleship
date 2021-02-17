/* eslint-disable no-undef */
describe('Ships', function () {
  it('should Create', function () {
    const ships = initShips()
    expect(ships).toEqual([
      {
        name: 'Destroyer',
        location: null,
        body: [true, true]
      },
      {
        name: 'Submarine',
        location: null,
        body: [true, true, true]
      },
      {
        name: 'Cruiser',
        location: null,
        body: [true, true, true]
      },
      {
        name: 'Battleship',
        location: null,
        body: [true, true, true, true]
      },
      {
        name: 'Carrier',
        location: null,
        body: [true, true, true, true, true]
      }
    ])
  })
})
describe('Ship placement', () => {
  let boardElements = []
  beforeEach(function () {
    // Create board without event listeners
    boardElements = []
    for (let i = 0; i < 64; i++) {
      const currentSquare = document.createElement('div')
      boardElements.push(currentSquare)
    }
  })
  it('should validate', function () {
    expect(checkPlacement(boardElements, initShips()[0], 0)).toBe(true)
  })
  it('should invalidate', function () {
    expect(checkPlacement(boardElements, initShips()[0], 60)).toBe(false)
  })
})
