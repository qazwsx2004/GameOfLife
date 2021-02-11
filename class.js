/* Xot*/
class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply >0) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY, 1);
            grassArr.push(newGr);
        }
    }

}



/*Xotaker */

class Xotaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 45;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0))

        if (empty && this.energy > 12) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2;
            var xt = new Xotaker(newX, newY, 1);
            XotakerArr.push(xt);
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
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
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 10

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
/* Gishatich */
class Gishatich {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 14;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0))

        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3;
            var xr = new Gishatich(newX, newY, 1);
            GishatichArr.push(xr);
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy-=2
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
        var food = random(this.chooseCell(2))
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
            this.energy += 18;

        }
    }
    eat1(){
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 15;

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
/* Mard */
class Mard {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 35;
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
    chooseCell(character) {
        this.getNewDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0))

        if (empty && this.energy > 20) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4;
            var xq = new Mard(newX, newY, 1);
            MardArr.push(xq);
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        this.energy-=3
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
        var food = random(this.chooseCell(3))
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
            this.energy += 28;
        }


    }
    eat1() {
        var food = random(this.chooseCell(2))
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
            this.energy += 15;
        }

    }
    eat2() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 10;
        }
    }
    paxchel(){
        var empty = random(this.chooseCell(5))
       if(empty){
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
        if(this.energy>=40){
            matrix[this.y][this.x] = 0
            for (var i in MardArr) {
                if (MardArr[i].x == this.x && MardArr[i].y == this.y) {
                    MardArr.splice(i, 1)
                }
            }

        }
    }



}
/* Terrorist*/
class Terrorist {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 25;
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
    chooseCell(character) {
        this.getNewDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mult() {
        var empty = random(this.chooseCell(0))

        if (empty && this.energy > 35) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5;
            var xp = new Terrorist(newX, newY, 1);
            TerArr.push(xp);
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy-=4
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
        var food = random(this.chooseCell(4))
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
            this.energy += 10;
        }


    }
    eat1() {
        var food = random(this.chooseCell(3))
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
        var food = random(this.chooseCell(2))
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
            this.energy += 5;
        }
    }
    eat3() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
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
        if(this.energy>=40){
            matrix[this.y][this.x] = 0
            for (var i in TerArr) {
                if (TerArr[i].x == this.x && TerArr[i].y == this.y) {
                    TerArr.splice(i, 1)
                }
            }
        }
    }

}
