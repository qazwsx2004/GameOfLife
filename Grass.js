
let Parent = require("./Parent");
module.exports = class Grass extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.random(this.chooseCell(0))
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                var gr = new Grass(x, y, 1)
                GrassArr.push(gr)
                this.multiply = 0;
            }
        }
    }
}