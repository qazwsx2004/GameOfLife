/* Gishatich */
let Parent =require("./Parent");

module.exports = class Gishatich extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 12;
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
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    mult() {
        var empty = this.random(this.chooseCell(0))

        if (empty && this.energy > 11) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3;
            var xr = new Gishatich(newX, newY, 1);
            GishatichArr.push(xr);
        }
    }
    move() {
        var empty = super.random(this.chooseCell(0))
        this.energy -= 2
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = this.random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            for (var i in XotakerArr) {
                if (XotakerArr[i].x == newX && XotakerArr[i].y == newY) {
                    XotakerArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 25;
        }
    }
    eat1() {
        var food = this.random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            for (var i in GrassArr) {
                if (GrassArr[i].x == newX && GrassArr[i].y == newY) {
                    GrassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 9;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in GishatichArr) {
                if (GishatichArr[i].x == this.x && GishatichArr[i].y == this.y) {
                    GishatichArr.splice(i, 1)
                }
            }

        }
    }
}
