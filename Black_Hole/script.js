const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const W = canvas.width
const H = canvas.height

const renderQuality = 100
const center = { x: W / 2, y: H / 2 }

const G = 1
const c = 1
const M = 50
const dl = 0.5

const raySlowness = c
const raySpeed = c / raySlowness
const initialRays = 5000
const rayWidth = 150 / initialRays
ctx.lineWidth = rayWidth
const extraRayAmount = 2000
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
}
function circle(renderQuality, mass) {
    const rs = 2 * G * mass / (c * c);   // nu i pixlar direkt
    for (let i = 0; i < renderQuality; i++) {
        let theta = Math.PI / 2 * i / renderQuality
        let blockWidth = Math.cos(theta) * rs
        let blockHeight = Math.sin(theta) * rs
        ctx.fillStyle = "black";
        ctx.fillRect(
            center.x - blockWidth,
            center.y - blockHeight,
            blockWidth * 2,
            blockHeight * 2
        );
    }
} circle(renderQuality, M)
function rayMove(x, y, theta, dr, dtheta) {
    const dx0 = x - center.x;
    const dy0 = y - center.y;
    const r = Math.sqrt(dx0 * dx0 + dy0 * dy0);

    const rs = 2 * M;

    if (r <= rs) {
        return { x, y, theta, dr: 0, dtheta: 0 };
    }
    const rx = dx0 / r;
    const ry = dy0 / r;

    const accel = -2 * M / (r * r);
    const ax = accel * rx;
    const ay = accel * ry;

    let vx = Math.cos(theta);
    let vy = Math.sin(theta);
    vx += ax * dl;
    vy += ay * dl;

    const vnorm = Math.sqrt(vx * vx + vy * vy);
    vx /= vnorm;
    vy /= vnorm;

    const newX = x + vx * dl;
    const newY = y + vy * dl;
    const newTheta = Math.atan2(vy, vx);
    return {
        x: newX,
        y: newY,
        theta: newTheta,
        dr: 0,
        dtheta: 0
    };
} const rayPosition = []
// for (let i = 0; i < initialRays; i++) {
//     rayPosition[i] = { x: 0, y: i / initialRays * H, theta: Math.PI }
//     rayPosition[i + initialRays] = { x: W, y: i / initialRays * H, theta: 0 }
//     rayPosition[i + 2 * initialRays] = { x: i / initialRays * W, y: 0, theta: -Math.PI / 2 }
//     rayPosition[i + 3 * initialRays] = { x: i / initialRays * W, y: H, theta: Math.PI / 2 }
// }
function extraRays(n) {
    for (let i = 0; i < n; i++) {
        rayPosition.push({ x: mouseX, y: mouseY, theta: i / n * 2 * Math.PI, dr: 0, dtheta: 0 })
    }
}
function engine() {
    ctx.beginPath()
    for (let i = 0; i < rayPosition.length; i++) {
        ctx.moveTo(rayPosition[i].x, rayPosition[i].y)
        rayPosition[i] = rayMove(rayPosition[i].x, rayPosition[i].y, rayPosition[i].theta, rayPosition[i].dr, rayPosition[i].dtheta)
        ctx.lineTo(rayPosition[i].x, rayPosition[i].y)
    } ctx.stroke()
}

