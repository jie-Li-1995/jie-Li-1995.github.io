var pointMap = {
  A: [-50, 50, 50],
  B: [-50, 50, -50],
  C: [50, 50, -50],
  D: [50, 50, 50],
  E: [-50, -50, 50],
  F: [-50, -50, -50],
  G: [50, -50, -50],
  H: [50, -50, 50]
}

var visual = {
  x: 0,
  y: 0,
  z: 300
}

var canvasWidth = 600
var canvasHeight = 400

var ctx = document.getElementById('test').getContext('2d')

function transformCoordinatePoint(x, y, z, offsetX = canvasWidth / 2, offsetY = canvasHeight / 2) {
  return {
    x: (x - visual.x) * visual.z / (visual.z - z) + offsetX,
    y: (y - visual.y) * visual.z / (visual.z - z) + offsetY
  }
}

function draw() {
  let point
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  // 绘制矩形ABCD
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.A)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.B)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.C)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.D)
  ctx.lineTo(point.x, point.y)
  ctx.fillStyle = "#0000ff";
  ctx.fill()
  ctx.closePath()
  ctx.stroke()
  // 绘制矩形EFGH
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.E)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.F)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.G)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.H)
  ctx.lineTo(point.x, point.y)
  ctx.fillStyle = "#0000ff";
  ctx.fill()
  ctx.closePath()
  ctx.stroke()
  // 绘制直线AE
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.A)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.E)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.F)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.B)
  ctx.lineTo(point.x, point.y)
  ctx.fillStyle = "red";
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  // 绘制直线BF
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.D)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.C)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.G)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.H)
  ctx.lineTo(point.x, point.y)
  ctx.fillStyle = "red";
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  // 绘制直线CD
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.B)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.C)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.G)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.F)
  ctx.lineTo(point.x, point.y)
  ctx.fillStyle = "#ff6700";
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  // 绘制直线DH
  ctx.beginPath()
  ctx.fillStyle = "#000";
  point = transformCoordinatePoint(...pointMap.A)
  ctx.moveTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.E)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.H)
  ctx.lineTo(point.x, point.y)
  point = transformCoordinatePoint(...pointMap.D)
  ctx.lineTo(point.x, point.y)
  // ctx.fillStyle = "yellow";
  // ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

function animationFrame() {
  let rotationAngle = 1
  window.requestAnimationFrame(() => {
    for (let key in pointMap) {
      let point = pointMap[key]
      // 保存x,y,z坐标
      let x = point[0]
      let y = point[1]
      let z = point[2]
      // 变换后的x坐标
      point[0] = x * Math.cos(rotationAngle / 180 * Math.PI) - z * Math.sin(rotationAngle / 180 * Math.PI)
      // 绕y轴旋转，y左边不会发生变化
      point[1] = y
      // 变换后的z坐标
      point[2] = z * Math.cos(rotationAngle / 180 * Math.PI) + x * Math.sin(rotationAngle / 180 * Math.PI)
    }
    draw()
    animationFrame()
  })
}

animationFrame()