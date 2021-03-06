let Parent = require("./Parent");
module.exports = class Terrorist extends Parent {
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
        this.energy = 13;
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

        if (empty && this.energy > 12) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5;
            var xp = new Terrorist(newX, newY, 1);
            TerArr.push(xp);
        }
    }
    move() {
        var empty = this.random(this.chooseCell(0))
        this.energy -= 4
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
    }
    eat() {
        var food = this.random(this.chooseCell(4))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            for (var i in MardArr) {
                if (MardArr[i].x == newX && MardArr[i].y == newY) {
                    MardArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 11;
        }
    }
    eat1() {
        var food = this.random(this.chooseCell(3))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            for (var i in GishatichArr) {
                if (GishatichArr[i].x == newX && GishatichArr[i].y == newY) {
                    GishatichArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 7;
        }
    }
    eat2() {
        var food = this.random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            for (var i in XotakerArr) {
                if (XotakerArr[i].x == newX && XotakerArr[i].y == newY) {
                    XotakerArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 9;
        }
    }
    eat3() {
        var food = this.random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            for (var i in GrassArr) {
                if (GrassArr[i].x == newX && GrassArr[i].y == newY) {
                    GrassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 2;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in TerArr) {
                if (TerArr[i].x == this.x && TerArr[i].y == this.y) {
                    TerArr.splice(i, 1)
                }
            }
        }
        if (this.energy >= 40) {
            matrix[this.y][this.x] = 0
            for (var i in TerArr) {
                if (TerArr[i].x == this.x && TerArr[i].y == this.y) {
                    TerArr.splice(i, 1)
                }
            }
        }
    }
}