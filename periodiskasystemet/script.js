let short = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca']
let names = ['Väte', 'Helium', 'Litium', 'Beryllium', 'Bor', 'Kol', 'Kväve', 'Syre', 'Fluor', 'Neon', 'Natrium', 'Magnesium', 'Aluminium', 'Kisel', 'Fosfor', 'Svavel', 'Klor', 'Argon', 'Kalium', 'Kalcium']
let random = 0
let random2 = 0
let n = 1
let text = document.getElementById("text");
document.addEventListener("mousedown", mouseDown);
function mouseDown() {
    runTest()
}
document.addEventListener("touchstart", touchStart)
function touchStart() {
    runTest()
}
function runTest() {
    n *= -1
    if (n == -1) {
        random = Math.round(Math.random() * (short.length - 1));
        random2 = Math.round(Math.random() * 3)
        text.textContent = ""
        if (random2 == 0, random2 == 3) {
            text.append(short[random])
        } else if (random2 == 1) {
            text.append(names[random])
        } else {
            text.append(random + 1)
        }
    } else {
        if (random2 == 0, random2 == 3) {
            text.append(" " + names[random])
            text.append(" " + random + 1)
        } else if (random2 == 1) {
            text.append(" " + short[random])
            text.append(" " + random + 1)
        } else {
            text.append(" " + names[random])
            text.append(" " + short[random])
        }
    }
}