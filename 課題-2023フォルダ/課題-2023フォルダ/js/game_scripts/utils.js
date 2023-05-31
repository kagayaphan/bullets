/*
* Base Class And Tools Section
*/

// Screen render control
const Screen = {};
Screen.centerW = global.canvas.width /2 ;
Screen.centerH = global.canvas.height /2 ;


const game_handlers = new Map([
    ["playParticles", playParticles],
    ["stopParticles", stopParticles],
    ["createEditors", createEditors],
]);

// object debug parameter array
var debugDragBar = [];
function createEditors(obj){
    debugDragBar.forEach(function(bar) {
        bar.referencedObj = null;
    });
    debugDragBar = [];
    const length = debugDragBar.length + 1;
    debugDragBar.push(new DragBar(100, 50*length,255,255, obj));
}

// easy handling bar object
class DragBar {
    constructor(x, y, barWidth, maxParameterValue, referencedObj) {
        this.canvas = global.canvas;
        this.ctx = global.c2d;
        this.x = x;
        this.y = y;
        this.barWidth = barWidth;
        this.dragHandleWidth = 20;
        this.dragHandlePosition = 0;
        this.parameterValue = 1;
        this.maxParameterValue = maxParameterValue;

        this.referencedObj = referencedObj;

        this.mdHandler = this.handleMouseDown.bind(this);
        this.mmHandler = this.handleMouseMove.bind(this)
        this.muHandler = this.handleMouseUp.bind(this);

        this.canvas.addEventListener('mousedown', this.mdHandler);
    }

    updateParameterValue() {
        this.parameterValue = Math.round((this.dragHandlePosition / (this.barWidth - this.dragHandleWidth)) * this.maxParameterValue);
        // console.log('Parameter value:', this.parameterValue);

        // Update the color object based on the parameter value
        if (this.referencedObj instanceof Button) {
            this.referencedObj.red = this.parameterValue;
        }
    }

    draw() {
        // Draw the drag bar
        this.ctx.fillStyle = '#ccc';
        this.ctx.fillRect(this.x, this.y, this.barWidth, 20);

        // Draw the drag handle
        this.ctx.fillStyle = '#888';
        this.ctx.fillRect(this.x + this.dragHandlePosition, this.y, this.dragHandleWidth, 20);
    }

    handleMouseDown(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if the mouse is within the drag bar bounds
        const mmHandler =  this.mmHandler
        const muHandler = this.muHandler;
        if (x >= this.x && x <= this.x + this.barWidth &&
            y >= this.y && y <= this.y + 20) {
            global.canvas.addEventListener('mousemove', mmHandler);
            global.canvas.addEventListener('mouseup', muHandler);
        }


    }

    handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if the mouse is within the drag bar bounds
        if (x >= this.x && x <= this.x + this.barWidth &&
            y >= this.y && y <= this.y + 20) {
            let newX = x - this.x - this.dragHandleWidth / 2;

            // Restrict the handle within the bounds of the drag bar
            if (newX < 0) {
                newX = 0;
            } else if (newX > this.barWidth - this.dragHandleWidth) {
                newX = this.barWidth - this.dragHandleWidth;
            }

            this.dragHandlePosition = newX;
            this.updateParameterValue();
            this.draw();
        }
    }

    handleMouseUp(event) {
        // Release the handler
        global.canvas.removeEventListener('mousemove', this.mmHandler);
        global.canvas.removeEventListener('mouseup', this.muHandler);
    }
}



// Button class
class Button {
    constructor(x, y, width, height, content, red, green, blue, clickHandler) {
        this.x = x - width/2;
        this.y = y - height/2;
        this.width = width;
        this.height = height;
        this.content = content;
        this.fontFamily = "Arial";
        this.fontSize = 18;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = 1;
        this.clickHandler = clickHandler;
        this.cornerRadius = 15;

    }

    draw(ctx) {

        // Code to draw button with soft edge
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.x + this.cornerRadius, this.y);
        ctx.lineTo(this.x + this.width - this.cornerRadius, this.y);
        ctx.arc(this.x + this.width - this.cornerRadius, this.y + this.cornerRadius, this.cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
        ctx.arc(this.x + this.width - this.cornerRadius, this.y + this.height - this.cornerRadius, this.cornerRadius, 0, 0.5 * Math.PI);
        ctx.lineTo(this.x + this.cornerRadius, this.y + this.height);
        ctx.arc(this.x + this.cornerRadius, this.y + this.height - this.cornerRadius, this.cornerRadius, 0.5 * Math.PI, Math.PI);
        ctx.lineTo(this.x, this.y + this.cornerRadius);
        ctx.arc(this.x + this.cornerRadius, this.y + this.cornerRadius, this.cornerRadius, Math.PI, 1.5 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.content, this.x + this.width / 2, this.y + (this.height + this.fontSize) / 2);

    }

    handleClick(event) {

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height) {
            console.log("Button clicked!");
            this.clickHandler(this);
        }
    }
}

class GameText {
    constructor(content, size, x, y, color) {
        this.content = content;
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.family = "px Arial";
    }

    setFontFamily(font){
        this.family = font;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.size + this.family;
        ctx.fillText(this.content, this.x, this.y);
    }
}

class FlickerText extends GameText {

    constructor(content, size, x, y, color, duration, interval) {
        super(content, size, x, y, color);
        this.duration = duration;
        this.visible = true;
        this.interval = interval;  // Interval between opacity changes in milliseconds
        this.start = Date.now(); // Get the start time
    }

    draw(){
        if(!this.visible) return;
        // validate
        const timePassed = Date.now() - this.start;
        if(timePassed > this.duration * 1000) {
            this.visible = false;
            return;
        }
        const opacity = Math.sin((timePassed % this.interval) / this.interval * Math.PI);
        global.c2d.fillStyle = `rgba(${this.color}, ${opacity})`;
        global.c2d.font = this.size + this.family;
        global.c2d.fillText(this.content, this.x, this.y);

    }

}


