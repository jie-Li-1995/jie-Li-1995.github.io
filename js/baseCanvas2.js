// 呱呱乐
var canvasDom = document.querySelector('canvas')
var ctx = canvasDom.getContext('2d')

var lunzi = new Image()
lunzi.src = "./img/lunzi.jpg"

lunzi.onload = function () {
    ctx.drawImage(lunzi, 0, 0, canvasDom.width, canvasDom.height)
    ctx.globalCompositeOperation = 'destination-out'
}

var ableMouse = false

$('canvas').mousedown(function () {
    ableMouse = true
})

$('canvas').mouseup(function () {
    ableMouse = false
})

$('canvas').mousemove(function (e) {
    if (ableMouse) {
        ctx.beginPath()
        ctx.fillStyle = "#ff6700"
        ctx.arc(e.offsetX, e.offsetY, 10, 0, Math.PI * 2)
        ctx.fill()
    }
})