const enemys: Enemy[] = [];

class Enemy {
    id: number;
    hp: number;
    texture: string;
    html: HTMLElement;
    x: number;
    y: number;

    init(): void {
        this.id = enemys.length;

        const img: HTMLElement = document.createElement("img");
        img.classList.add("enemy");
        img.setAttribute("id", "enemy"+enemys.length);
        img.setAttribute("src", `img/enemys/${this.texture}`);
        map.insertAdjacentElement("beforeend", img);
        this.html = document.getElementById("enemy"+this.id);

        enemys.push(this);
    }

    move(x: number, y: number): void
    {
        this.html.style.top = y+"px";
        this.html.style.left = x+"px";
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