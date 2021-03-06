let Parent = require("./Parent");

module.exports = class Mard extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ]
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    mult() {
        var empty = this.random(this.chooseCell(0))

        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4;
            var xq = new Mard(newX, newY, 1);
            MardArr.push(xq);
        }
    }
    move() {
        var empty = this.random(this.chooseCell(0))
        this.energy -= 3
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
    }
    eat() {
        var food = this.random(this.chooseCell(3))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            for (var i in GishatichArr) {
                if (GishatichArr[i].x == newX && GishatichArr[i].y == newY) {
                    GishatichArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 17;
        }
    }
    eat1() {
        var food = this.random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            for (var i in XotakerArr) {
                if (XotakerArr[i].x == newX && XotakerArr[i].y == newY) {
                    XotakerArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 10;
        }

    }
    eat2() {
        var food = this.random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
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
    paxchel() {
        var empty = this.random(this.chooseCell(5))
        if (empty) {
            this.move()
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in MardArr) {
                if (MardArr[i].x == this.x && MardArr[i].y == this.y) {
                    MardArr.splice(i, 1)
                }
            }

        }
        if (this.energy >= 40) {
            matrix[this.y][this.x] = 0
            for (var i in MardArr) {
                if (MardArr[i].x == this.x && MardArr[i].y == this.y) {
                    MardArr.splice(i, 1)
                }
            }

        }
    }
}
