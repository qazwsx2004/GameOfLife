var socket = io();
function setup() {
    createCanvas(25 * side, 25 * side);
    background("#acacac");
}
var side = 20;

function nkarel(matrix) {
    console.log(matrix);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                fill("green");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (obj == 0) {
                fill("#acacac")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 3) {
                fill("red")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 4) {
                fill("blue")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 5) {
                fill("black")
                rect(x * side, y * side, side, side)
            }
        }
    }
}
    setInterval(
        function () {
        socket.on('send matrix', nkarel)
        },1000
    )
    function kill() {
        socket.emit("kill")
    } 
    function Energy(){
        socket.emit("energy shortage")
    }   
