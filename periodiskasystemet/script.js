let short = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca']
let names = ['Väte', 'Helium', 'Litium', 'Beryllium', 'Bor', 'Kol', 'Kväve', 'Syre', 'Fluor', 'Neon', 'Natrium', 'Magnesium', 'Aluminium', 'Kisel', 'Fosfor', 'Svavel', 'Klor', 'Argon', 'Kalium', 'Kalcium']
let random = 0
let index = 1
let random2 = 0
let n = 1
let t = false
let textindex = document.getElementById("textindex");
let textshort = document.getElementById("textshort");
let textname = document.getElementById("textname");
document.addEventListener("mousedown", mouseDown);
function mouseDown() {
    t = true
} if (t == true) {
    document.addEventListener("mouseup", mouseUp);
    function mouseUp() {
        runTest()
        t = false
    }
}
document.addEventListener("touchstart", touchStart)
function touchStart() {
    t = true
} if (t == true) {
    document.addEventListener("touchend", touchEnd)
    document.addEventListener("touchcancel", touchEnd)
    function touchEnd() {
        runTest()
        t = false
    }
}
function runTest() {
    n *= -1
    if (n == -1) {
        random = Math.round(Math.random() * (short.length - 1));
        random2 = Math.round(Math.random() * 3)
        index = random + 1
        textshort.textContent = " "
        textname.textContent = " "
        textindex.textContent = " "
        if (random2 == 0 || random2 == 3) {
            textshort.append(short[random])
        } else if (random2 == 1) {
            textname.append(names[random])
        } else {
            textindex.append(index)
        }
    } else {
        if (random2 == 0 || random2 == 3) {
            textname.append(names[random])
            textindex.append(index)
        } else if (random2 == 1) {
            textshort.append(short[random])
            textindex.append(index)
        } else {
            textname.append(names[random])
            textshort.append(short[random])
        }
    }
}