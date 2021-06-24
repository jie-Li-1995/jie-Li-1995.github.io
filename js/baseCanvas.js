var canvasDom = document.querySelector('canvas')
var ctx = canvasDom.getContext('2d')

var lunzi = new Image()
lunzi.src = "/img/lunzi.jpg"

lunzi.onload(function () {
    ctx.drawImage(lunzi, 100, 100)
    console.log(ctx);
    ctx.save()
})