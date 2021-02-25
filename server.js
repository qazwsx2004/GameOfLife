var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
;
matrix = []

function random(a, b){
    return Math.floor(Math.random() * b)
}

function MatrixGenerator(rows, columns){
    for (let y = 0; y < rows; y++) {
        matrix[y] = [];
            for (let x = 0; x < columns; x++) {
                let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 70) {
                matrix[y][x] = 0; 
            }
                if (a >= 70 && a < 83) {
                matrix[y][x] = 1; 
            }
            else if (a >= 83 && a < 90) {
                matrix[y][x] = 2; 
            }
            else if (a >= 90 && a < 95) {
                matrix[y][x] = 3; 
            }
            else if (a >= 95 && a < 98) {
                matrix[y][x] = 4; 
            }
            else if (a >= 98 && a < 100) {
                matrix[y][x] = 5; 
            }
        }
    }
}

MatrixGenerator(25, 25)
io.sockets.emit('send matrix', matrix)
 side = 20;
 TerArr = [];
 MardArr = [];
 GishatichArr = [];
 GrassArr = [];
 XotakerArr = [];

Grass = require("./Grass")
Xotaker = require("./Xotaker")
Gishatich = require("./Gishatich")
Mard = require("./Mard")
Terrorist = require("./Terrorist")
function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                GrassArr.push(gr)
            }
        else if (matrix[y][x] == 2) {
            var xt = new Xotaker(x, y, 2)
            XotakerArr.push(xt)
        }
        else if (matrix[y][x] == 3) {
            var xr = new Gishatich(x, y, 3)
            GishatichArr.push(xr);
        }
        else if (matrix[y][x] == 4) {
            var xq = new Mard(x, y, 4)
            MardArr.push(xq);
        }
        else if (matrix[y][x] == 5) {
            var xp = new Terrorist(x, y, 5)
            TerArr.push(xp);
        }
    }
}
io.sockets.emit('send matrix', matrix)
}
function game() {
    for (var i in GrassArr) {
        GrassArr[i].mul()
    }
    for (var i in XotakerArr) {
        XotakerArr[i].move()
        XotakerArr[i].eat()
        XotakerArr[i].mult()
        XotakerArr[i].die()
    }
    for (var i in GishatichArr) {
        GishatichArr[i].move()
        GishatichArr[i].eat()
        GishatichArr[i].mult()
        GishatichArr[i].eat1()
         GishatichArr[i].die()
    }
    for (var i in MardArr) {
        MardArr[i].move()
        MardArr[i].paxchel()
        MardArr[i].eat2()
        MardArr[i].eat1()
        MardArr[i].eat()
       MardArr[i].mult()
        MardArr[i].die()

    }
      for(var i in TerArr){
         TerArr[i].move()
         TerArr[i].eat1()
         TerArr[i].eat2()
         TerArr[i].eat()
          TerArr[i].mult()
         TerArr[i].die()
      }
      
   
    io.sockets.emit("send matrix", matrix);
}
setInterval(game,2000)

io.on('connection', function (socket) {
    createObject(matrix)

})
