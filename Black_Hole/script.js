const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const W = canvas.width
const H = canvas.height

const renderQuality = 100
const radius = 100
const center = { x: W / 2, y: H / 2 }

const G = 6.67408e-11
const M = 1e10
const c = 3e8
const dl = 1e5

const raySlowness = c
const raySpeed = c / raySlowness
const initialRays = 5000
const rayWidth = 150 / initialRays
ctx.lineWidth = rayWidth
const extraRayAmount = 1000
const interval = 10
var tick = interval

//Mouse logic
let mouseX = 0
let mouseY = 0
let mouseVal = false
document.addEventListener("mousemove", mouseMove);
function mouseMove(e) {
    mouseX = e.x
    mouseY = e.y
}
document.addEventListener("mousedown", mouseDown);
function mouseDown(e) {
    mouseVal = true
}
document.addEventListener("mouseup", mouseUp);
function mouseUp() {
    mouseVal = false
}
//Keyboard logic 
const keyState = {};
window.addEventListener("keydown", (event) => {
    keyState[event.key] = true; // Mark the key as pressed
    console.log(`${event.key} is pressed`);
});
window.addEventListener("keyup", (event) => {
    keyState[event.key] = false; // Mark the key as released
    console.log(`${event.key} is released`);
});
function isKeyPressed(key) {
    return !!keyState[key];
} // Simulating when Shift held
setInterval(() => {
    // if (isKeyPressed("Shift")) {
    engine()
    // }
    if (mouseVal == false) {
        tick = interval
    } if (mouseVal == true) {
        tick++
        if (tick >= interval) {
            extraRays(extraRayAmount)
            tick = 0
        }
    }
}, 10);
function cartesianToPolar(x, y) {
    return {
        r: Math.sqrt(x ** 2 + y ** 2),
        theta: Math.atan2(y, x)
    }
} function circle(renderQuality, radius) {
    for (let i = 0; i < renderQuality; i++) {
        let theta = Math.PI / 2 * i / renderQuality
        var blockWidth = Math.cos(theta) * radius
        var blockHeight = Math.sin(theta) * radius
        ctx.fillStyle = "black";
        ctx.fillRect(center.x - blockWidth, center.y - blockHeight, blockWidth * 2, blockHeight * 2);
    }

} circle(renderQuality, radius)
function rayMove(x, y, theta) {
    const polar = cartesianToPolar(x - center.x, y - center.y)
    const dls = polar.r * 1e8
    const ds = dls + dl
    const thetaE = Math.sqrt((4 * G * M * dls) / (c ** 2 * dl * ds))
    theta += thetaE * 3e8
    dx = -Math.cos(theta) * raySpeed
    dy = -Math.sin(theta) * raySpeed
    if (polar.r < radius) {
        return { x: x, y: y, theta: theta }
    } else {
        return { x: x + dx, y: y + dy, theta: theta }
    }
} const rayPosition = []
// for (let i = 0; i < initialRays; i++) {
//     rayPosition[i] = { x: 0, y: i / initialRays * H, theta: Math.PI }
//     rayPosition[i + initialRays] = { x: W, y: i / initialRays * H, theta: 0 }
//     rayPosition[i + 2 * initialRays] = { x: i / initialRays * W, y: 0, theta: -Math.PI / 2 }
//     rayPosition[i + 3 * initialRays] = { x: i / initialRays * W, y: H, theta: Math.PI / 2 }
// }
function extraRays(n) {
    for (let i = 0; i < n; i++) {
        rayPosition.push({ x: mouseX, y: mouseY, theta: i / n * 2 * Math.PI })
    }
}
function engine() {
    ctx.beginPath()
    for (let i = 0; i < rayPosition.length; i++) {
        ctx.moveTo(rayPosition[i].x, rayPosition[i].y)
        rayPosition[i] = rayMove(rayPosition[i].x, rayPosition[i].y, rayPosition[i].theta)
        ctx.lineTo(rayPosition[i].x, rayPosition[i].y)
    } ctx.stroke()
}

