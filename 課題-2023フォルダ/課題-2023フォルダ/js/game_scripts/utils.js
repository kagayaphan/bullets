/*
* Base Class And Tools Section
*/

// Button class
class Button {
    constructor(x, y, width, height, text, color, clickHandler) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.clickHandler = clickHandler;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText(this.text, this.x + 20, this.y + 30);
    }

    handleClick(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        if (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height) {
            // alert("Button clicked!");
            this.clickHandler();
        }
    }
}
