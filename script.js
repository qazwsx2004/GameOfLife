var socket = io();
function setup() {
    createCanvas(7 * side, 13 * side);
    background("#acacac");
}
var side = 30;

function nkarel() {
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
                rect(x * side, y * side, side, side);s
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
