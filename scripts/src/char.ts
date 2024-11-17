class Char
{
    html: HTMLElement;
    orientation: string;

    constructor() 
    {
        this.html = document.getElementById("char");
        this.orientation = "left";
    }
}

const char: Char = new Char();

window.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.key == "ArrowDown")
    {
        document.documentElement.style.setProperty("--char-orientation", '0deg');
        char.orientation = "down";
    }
    else if(e.key == "ArrowLeft")
    {
        document.documentElement.style.setProperty("--char-orientation", '90deg');
        char.orientation = "left";
    }
    else if(e.key == "ArrowUp")
    {
        document.documentElement.style.setProperty("--char-orientation", '180deg');
        char.orientation = "up";
    }
    else if(e.key == "ArrowRight")
    {
        document.documentElement.style.setProperty("--char-orientation", '270deg');
        char.orientation = "right";
    }
});