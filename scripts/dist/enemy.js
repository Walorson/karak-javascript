const enemys = [];
class Enemy {
    init() {
        this.id = enemys.length;
        const img = document.createElement("img");
        img.classList.add("enemy");
        img.setAttribute("id", "enemy" + enemys.length);
        img.setAttribute("src", `img/enemys/${this.texture}`);
        map.insertAdjacentElement("beforeend", img);
        this.html = document.getElementById("enemy" + this.id);
        enemys.push(this);
    }
    move(x, y) {
        this.html.style.top = y + "px";
        this.html.style.left = x + "px";
    }
}
class Rat extends Enemy {
    constructor() {
        super();
        this.hp = 5;
        this.texture = "rat.png";
        this.init();
    }
}
//# sourceMappingURL=enemy.js.map