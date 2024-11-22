const map = document.getElementById("map");
const tiles = [];
let activeTile;
const TILE_SIZE = 128;
const START_X = 820;
const START_Y = 420;
class Tile {
    constructor() {
        this.texture = "room";
        this.blockedOrientations = [];
        this.id = tiles.length;
        const tile = document.createElement("img");
        tile.setAttribute("src", `img/tiles/${this.texture}.png`);
        tile.classList.add("tile");
        tile.setAttribute("id", "tile" + this.id);
        map.insertAdjacentElement("beforeend", tile);
        tiles.push(this);
        this.html = document.getElementById("tile" + this.id);
        if (this.id > 0) {
            this.x = activeTile.html.offsetLeft;
            this.y = activeTile.html.offsetTop;
            this.mapX = activeTile.mapX;
            this.mapY = activeTile.mapY;
            if (char.orientation == 'left') {
                this.mapX--;
                this.shiftX = this.x - TILE_SIZE;
                this.shiftY = this.y;
            }
            else if (char.orientation == 'right') {
                this.mapX++;
                this.shiftX = this.x + TILE_SIZE;
                this.shiftY = this.y;
            }
            else if (char.orientation == 'up') {
                this.mapY++;
                this.shiftX = this.x;
                this.shiftY = this.y - TILE_SIZE;
            }
            else if (char.orientation == 'down') {
                this.mapY--;
                this.shiftX = this.x;
                this.shiftY = this.y + TILE_SIZE;
            }
            this.updateMapPosition();
            tile.setAttribute("style", `left: ${this.shiftX}px; top: ${this.shiftY}px;`);
            char.html.style.left = `${this.shiftX}px`;
            char.html.style.top = `${this.shiftY}px`;
        }
        else {
            tile.setAttribute("style", `left: ${START_X}px; top: ${START_Y}px;`);
            this.mapX = 0;
            this.mapY = 0;
            this.shiftX = this.html.offsetLeft;
            this.shiftY = this.html.offsetTop;
        }
        activeTile = this;
    }
    updateMapPosition() {
        map.style.transform = `translate(${-this.mapX * TILE_SIZE}px, ${this.mapY * TILE_SIZE}px)`;
    }
    reloadTexture() {
        document.getElementById("tile" + this.id).setAttribute("src", `img/tiles/${this.texture}.png`);
    }
    rotate(deg) {
        this.html.style.transform = `rotate(${deg}deg)`;
    }
    teleportChar() {
        char.html.style.left = `${this.shiftX}px`;
        char.html.style.top = `${this.shiftY}px`;
        this.updateMapPosition();
    }
}
class Room extends Tile {
    constructor() {
        super();
        this.summonEnemy(new Rat());
    }
    summonEnemy(enemy) {
        enemy.move(this.shiftX, this.shiftY);
    }
}
class Depo extends Tile {
    constructor() {
        super();
        this.texture = "depo";
        this.reloadTexture();
    }
}
class Tunnel extends Tile {
    constructor() {
        super();
        this.texture = "tunnel";
        this.reloadTexture();
        if (char.orientation == "left" || char.orientation == "right")
            this.blockedOrientations = ["up", "down"];
        else if (char.orientation == "up" || char.orientation == "down") {
            this.blockedOrientations = ["left", "right"];
            this.rotate(90);
        }
    }
}
class TunnelQuad extends Tile {
    constructor() {
        super();
        this.texture = "tunnelQuad";
        this.reloadTexture();
    }
}
class tunnelTriple extends Tile {
    constructor() {
        super();
        this.texture = "tunnelTriple";
        this.reloadTexture();
        const rand = Math.floor(Math.random() * 3);
        if (char.orientation == "left") {
            switch (rand) {
                case 0:
                    this.blockedOrientations = ["up"];
                    break;
                case 1:
                    this.rotateLeft();
                    break;
                case 2:
                    this.rotateDown();
                    break;
            }
        }
        else if (char.orientation == "up") {
            switch (rand) {
                case 0:
                    this.blockedOrientations = ["up"];
                    break;
                case 1:
                    this.rotateLeft();
                    break;
                case 2:
                    this.rotateRight();
                    break;
            }
        }
        else if (char.orientation == "right") {
            switch (rand) {
                case 0:
                    this.blockedOrientations = ["up"];
                    break;
                case 1:
                    this.rotateRight();
                    break;
                case 2:
                    this.rotateDown();
                    break;
            }
        }
        else if (char.orientation == "down") {
            switch (rand) {
                case 0:
                    this.rotateRight();
                    break;
                case 1:
                    this.rotateLeft();
                    break;
                case 2:
                    this.rotateDown();
                    break;
            }
        }
    }
    rotateLeft() {
        this.blockedOrientations = ["left"];
        this.rotate(270);
    }
    rotateRight() {
        this.blockedOrientations = ["right"];
        this.rotate(90);
    }
    rotateDown() {
        this.blockedOrientations = ["down"];
        this.rotate(180);
    }
}
new Depo();
window.addEventListener("keydown", (e) => {
    let x = activeTile.mapX;
    let y = activeTile.mapY;
    const orient = activeTile.blockedOrientations;
    switch (e.key) {
        case "ArrowLeft":
            x--;
            break;
        case "ArrowRight":
            x++;
            break;
        case "ArrowUp":
            y++;
            break;
        case "ArrowDown":
            y--;
            break;
    }
    if (e.key == "ArrowDown" && !orient.includes("down") || e.key == "ArrowUp" && !orient.includes("up") || e.key == "ArrowLeft" && !orient.includes("left") || e.key == "ArrowRight" && !orient.includes("right")) {
        if (tiles.some(tile => tile.mapX == x && tile.mapY == y)) {
            let tile = tiles.find(tile => tile.mapX == x && tile.mapY == y);
            if (char.orientation == "up" && tile.blockedOrientations.includes("down"))
                return;
            else if (char.orientation == "down" && tile.blockedOrientations.includes("up"))
                return;
            else if (char.orientation == "left" && tile.blockedOrientations.includes("right"))
                return;
            else if (char.orientation == "right" && tile.blockedOrientations.includes("left"))
                return;
            activeTile = tile;
            activeTile.teleportChar();
        }
        else {
            randomTile();
        }
    }
});
function randomTile() {
    const rand = Math.floor(Math.random() * 5);
    switch (rand) {
        case 0:
            new Room();
            break;
        case 1:
            new Tunnel();
            break;
        case 2:
            new TunnelQuad();
            break;
        case 3:
            new tunnelTriple();
            break;
        case 4:
            new Room();
            break;
    }
}
//# sourceMappingURL=tile.js.map