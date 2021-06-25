// 呱呱乐
var canvasDom = document.querySelector('canvas')
var ctx = canvasDom.getContext('2d')

var lunzi = new Image()
lunzi.src = "./img/lunzi.jpg"
lunzi.style.borderRadius = '50%'

var deg = 0
var step = 0
lunzi.onload = function () {
    setInterval(() => {
        deg += 0.1
        step += 1
        console.log(1111);
        ctx.clearRect(0, 0, 1200, 400)
        ctx.save()
        if (step >= canvasDom.width - 300 / 2) {
            step = 0
            ctx.translate(300 / 2, 300 / 2 + 50)
        } else {
            ctx.translate(300 / 2 + step, 300 / 2 + 50)
        }
        ctx.rotate(deg)
        ctx.drawImage(lunzi, -300 / 2, -300 / 2, 300, 300)
        ctx.restore()
    }, 20)
}

