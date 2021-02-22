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

var matrix = [ 
    [4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5],
    [0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5],
    [0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5],
    [0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5],
    [0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2],
    [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
    [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2],
]
io.sockets.emit('send matrix', matrix)
var side = 20;
var TerArr = [];
var MardArr = [];
var GishatichArr = [];
var GrassArr = [];
var XotakerArr = [];

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
         TerArr[i].eat3()
         TerArr[i].eat()
          TerArr[i].mult()
         TerArr[i].die()
      }
      
   
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)

})
