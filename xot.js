
var Parent = require("./Parent");
module.exports = class Xot extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
    }
    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 0) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY, 1);
            grassArr.push(newGr);
        }
    }
}