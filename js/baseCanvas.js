// 呱呱乐
var canvasDom = document.querySelector('canvas')
var ctx = canvasDom.getContext('2d')

var lunzi = new Image()
lunzi.src = "./img/superBG.jpg"

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
        if (getFilledPercentage() < 60) {
            ctx.beginPath()
            ctx.fillStyle = "#ff6700"
            ctx.arc(e.offsetX, e.offsetY, 10, 0, Math.PI * 2)
            ctx.fill()
        } else {
            scratchAll()
        }
    }
})

function scratchAll() {
    // 先使用CSS opacity清除，再使用canvas清除
    canvasDom.style.transition = 'all ' + '.8' + 's linear'
    canvasDom.style.opacity = '0'
    setTimeout(function () {
        clear();
    }, 800)
    // 执行回调函数
    // this.config.doneCallback && this.config.doneCallback();
}

function clear() {
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
}

function getFilledPercentage() {
    var imgData = ctx.getImageData(0, 0, canvasDom.width, canvasDom.height);
    // 存储当前cavnas画布的全部像素点信息
    var pixels = imgData.data;
    // 存储当前canvas画布的透明像素信息
    var transPixels = [];
    // 遍历全部像素点信息
    for (var i = 0; i < pixels.length; i += 4) {
        // 把透明的像素点添加到transPixels里
        if (pixels[i + 3] < 128) {
            transPixels.push(pixels[i + 3]);
        }
    }
    // 计算透明像素点的占比
    return Number((transPixels.length / (pixels.length / 4) * 100).toFixed(2))
}