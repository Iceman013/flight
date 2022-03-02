var xPos = 0;
const TICK = 1;
const SPEED = 10;
var moving = false;
var buttons = {};
var mouse = {
    "x": 0,
    "y": 0
};
var entities = [];
const update = new Event("update");
window.addEventListener("keydown", function(event) {
    buttons[event.key] = true;
    window.dispatchEvent(update);
});
window.addEventListener("keyup", function(event) {
    buttons[event.key] = false;
    window.dispatchEvent(update);
});
window.addEventListener("mousemove", function(event) {
    mouse["x"] = event.clientX;
    mouse["y"] = event.clientY;
});
window.addEventListener("mousedown", function(event) {
    buttons["mouse"] = true;
});
window.addEventListener("mouseup", function(event) {
    buttons["mouse"] = false;
});
function getState() {
    moving = false;
    if (buttons["a"]) {
        xPos += SPEED;
        moving = true;
    }
    if (buttons["d"]) {
        xPos -= SPEED;
        moving = true;
    }
    if (buttons["mouse"]) {
        createDot(mouse["x"], mouse["y"]);
    }
    if (xPos > 1350) {
        xPos = 1350;
    }
    if (xPos < 250) {
        xPos = 250;
    }
}
/*
https://cdn.discordapp.com/attachments/833507154828460062/948423580063006740/iu.png
*/
function createDot(x, y) {
    var base = document.createElement("img");
    base.src = "https://cdn.discordapp.com/attachments/833507154828460062/948423580063006740/iu.png";
    base.classList.add("pew");
    var ent = new Amo(x - xPos, y, 50, 50);
    ent.setElement(base);
    entities.push(ent);
}
function display() {
    if (moving) {
        document.getElementById("body").style.filter = "blur(1px)";
    } else {
        document.getElementById("body").style.filter = "blur(0)";
    }
    this.document.getElementById("background").style.transform = "translate(" + xPos + "px)";
    this.document.getElementById("cross").style.transform = "translate(" + (mouse["x"] - 50) + "px, " + (mouse["y"] - 50) + "px)";
    var temp = document.getElementById("ents");
    while (temp.firstChild) {
        temp.removeChild(temp.firstChild);
    }
    for (let i = entities.length - 1; i >= 0; i--) {
        entities[i].update();
        if (entities[i].remove()) {
            entities.splice(i, 1);
        }
    }
    for (let i = 0; i < entities.length; i++) {
        var base = entities[i].element;
        base.style.transform = "translate(" + (entities[i].getX() + xPos) + "px, " + entities[i].getY() + "px)";
        base.draggable = "false";
        document.getElementById("ents").appendChild(base);
    }
}
var intervalId = window.setInterval(function() {
    tick();
}, TICK);
function tick() {
    getState();
    display();
}