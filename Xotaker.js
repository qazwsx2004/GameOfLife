var Parent = require("./Parent");

module.exports = class Xotaker extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10;
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mult() {
        var empty = super.random(this.chooseCell(0))

        if (empty && this.energy > 11) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2;
            var xt = new Xotaker(newX, newY, 1);
            XotakerArr.push(xt);
        }
    }
    move() {
        var empty = super.random(this.chooseCell(0))
        this.energy--
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = super.random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            for (var i in GrassArr) {
                if (GrassArr[i].x == newX && GrassArr[i].y == newY) {
                    GrassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 20
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in XotakerArr) {
                if (XotakerArr[i].x == this.x && XotakerArr[i].y == this.y) {
                    XotakerArr.splice(i, 1)
                }
            }

        }
    }
}
