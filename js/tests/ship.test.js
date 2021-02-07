describe("Ships", function(){
    it('should Create', function(){
        let ships = initShips();
        expect(ships).toEqual([
            {
                name: "Destroyer",
                location: null,
                body: [true, true] 
            },
            {
                name: "Submarine",
                location: null,
                body: [true, true, true] 
            },
            {
                name: "Cruiser",
                location: null,
                body: [true, true, true] 
            },
            {
                name: "Battleship",
                location: null,
                body: [true, true, true, true] 
            },
            {
                name: "Carrier",
                location: null,
                body: [true, true, true, true, true] 
            },
        ]);
    })
});