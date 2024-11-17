const map = document.getElementById("map");
const tiles = [];
let activeTile = 0;
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
        if (this.id > 0) {
            this.x = tiles[activeTile].html.offsetLeft;
            this.y = tiles[activeTile].html.offsetTop;
            this.mapX = tiles[activeTile].mapX;
            this.mapY = tiles[activeTile].mapY;
            let shiftX;
            let shiftY;
            if (char.orientation == 'left') {
                this.mapX--;
                shiftX = this.x - TILE_SIZE;
                shiftY = this.y;
            }
            else if (char.orientation == 'right') {
                this.mapX++;
                shiftX = this.x + TILE_SIZE;
                shiftY = this.y;
            }
            else if (char.orientation == 'up') {
                this.mapY++;
                shiftX = this.x;
                shiftY = this.y - TILE_SIZE;
            }
            else if (char.orientation == 'down') {
                this.mapY--;
                shiftX = this.x;
                shiftY = this.y + TILE_SIZE;
            }
            this.updateMapPosition();
            tile.setAttribute("style", `left: ${shiftX}px; top: ${shiftY}px;`);
            char.html.style.left = `${shiftX}px`;
            char.html.style.top = `${shiftY}px`;
        }
        else {
            tile.setAttribute("style", `left: ${START_X}px; top: ${START_Y}px;`);
            this.mapX = 0;
            this.mapY = 0;
        }
        map.insertAdjacentElement("beforeend", tile);
        tiles.push(this);
        this.html = document.getElementById("tile" + this.id);
        activeTile = this.id;
    }
    updateMapPosition() {
        map.style.transform = `translate(${-this.mapX * TILE_SIZE}px, ${this.mapY * TILE_SIZE}px)`;
    }
    reloadTexture() {
        document.getElementById("tile" + this.id).setAttribute("src", `img/tiles/${this.texture}.png`);
    }
}
class Room extends Tile {
    constructor() {
        super();
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
            this.html.style.transform = "rotate(90deg)";
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
        this.blockedOrientations = ["up"];
    }
}
new Depo();
window.addEventListener("keydown", (e) => {
    const orient = tiles[activeTile].blockedOrientations;
    if (e.key == "ArrowDown" && !orient.includes("down") || e.key == "ArrowUp" && !orient.includes("up") || e.key == "ArrowLeft" && !orient.includes("left") || e.key == "ArrowRight" && !orient.includes("right")) {
        randomTile();
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