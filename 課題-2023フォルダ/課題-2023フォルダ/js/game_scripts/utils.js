/*
* Base Class And Tools Section
*/

// Function Pointer Map
const game_button_handlers = new Map([
    ["toggleParticles", toggleParticles],
    ["gotoTitle", gotoTitle],
    ["gotoMainScene", gotoMainScene],
    ["showRestaurant", showRestaurant],
    ["openInventory", openInventory],
]);


const icon_images = new Map([
    ["icon_nabe",       GameImages.icon_nabe],
    ["icon_crab",       GameImages.icon_crab],
    ["icon_octopus",    GameImages.icon_crab],
    ["icon_squid",      GameImages.icon_crab],
    ["icon_net",        GameImages.icon_crab],
    ["icon_toTitle",        GameImages.icon_toTitle],
    ["icon_setting",        GameImages.icon_setting],
    ["icon_inventory",        GameImages.icon_inventory],

]);


// object debug parameter array
let editorDragBars = [];

// easy handling bar object
class DragBar {
    constructor(x, y, barWidth, maxParameterValue, referencedObj, paramName) {
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
        this.paramName = paramName;

        this.mdHandler = this.handleMouseDown.bind(this);
        this.mmHandler = this.handleMouseMove.bind(this)
        this.muHandler = this.handleMouseUp.bind(this);

        this.canvas.addEventListener('mousedown', this.mdHandler);
    }


    destructor(){
        this.dragBars = [];
        this.referencedObj = null;
        this.canvas.removeEventListener('mousedown', this.mdHandler);
    }

    updateParameterValue() {
        this.parameterValue = Math.round((this.dragHandlePosition / (this.barWidth - this.dragHandleWidth)) * this.maxParameterValue);
        // console.log('Parameter value:', this.parameterValue);

        // Update the color object based on the parameter value
        if (this.referencedObj instanceof Button) {
            if(this.paramName === "red"){
                this.referencedObj.red = this.parameterValue;
            } else if(this.paramName === "green"){
                this.referencedObj.green = this.parameterValue;
            } else if(this.paramName === "blue"){
                this.referencedObj.blue = this.parameterValue;
            } else if(this.paramName === "opacity"){
                this.referencedObj.opacity = this.parameterValue / 100.0;
            } else if(this.paramName === "x"){
                this.referencedObj.x = this.parameterValue ;
            } else if(this.paramName === "y"){
                this.referencedObj.y = this.parameterValue ;
            }
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
        // if (x >= this.x && x <= this.x + this.barWidth &&
        //     y >= this.y && y <= this.y + 20) {
            
        // }
        let newX = x - this.x - this.dragHandleWidth / 2;

        // Restrict the handle within the bounds of the drag bar
        if (newX < 0) {
            newX = 0;
        } else if (newX > this.barWidth - this.dragHandleWidth) {
            newX = this.barWidth - this.dragHandleWidth;
        }

        this.dragHandlePosition = newX;
        this.updateParameterValue();
            
    }

    handleMouseUp(event) {
        // Release the handler
        global.canvas.removeEventListener('mousemove', this.mmHandler);
        global.canvas.removeEventListener('mouseup', this.muHandler);
    }
}



// Button class
class Button {
    constructor(x, y, width, height, 
        content, fontFamily, fontSize, foregroundOri, foregroundOver, 
        red, green, blue, opacity, scale,
        clickHandler, cornerRadius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = content;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
        this.clickHandler = clickHandler;
        this.cornerRadius = cornerRadius;
        this.foregroundOri = foregroundOri;
        this.foregroundOver = foregroundOver;
        this._foreground = foregroundOri;
        this._opacityOri = opacity;
        this._scale = scale;


    }

    createEditor() {
        editorDragBars.forEach(function(bar) {
            bar.destructor();
        });
        editorDragBars = [];
        let counter = 1;
        editorDragBars.push(new DragBar(100, 50*counter++,255,255, this, "red"));
        editorDragBars.push(new DragBar(100, 50*counter++,255,255, this, "green"));
        editorDragBars.push(new DragBar(100, 50*counter++,255,255, this, "blue"));
        editorDragBars.push(new DragBar(100, 50*counter++,255,100, this, "opacity"));
        editorDragBars.push(new DragBar(100, 50*counter++,255,1500, this, "x"));
        editorDragBars.push(new DragBar(100, 50*counter++,255,1500, this, "y"));
    }

    update(){
        const drawX = this.x - this.width/2;
        const drawY = this.y - this.height/2;
        let m = global.mouse.pos;
        const x = m.x ;
        const y = m.y ;

        if (x >= drawX && x <= drawX + this.width &&
            y >= drawY && y <= drawY + this.height) {
            // if mouse over
            if(this.opacity < 1) this.opacity += 0.01;
            if(this._scale < 1.15) this._scale += 0.01;
            this._foreground = this.foregroundOver;

        } else {    
            // if mouse leave
            if(this.opacity > this._opacityOri) this.opacity -= 0.01;            
            if(this._scale > 1.0) this._scale -= 0.01;  
            this._foreground = this.foregroundOri;

        }
    }

    draw(ctx) {
        const centerX = this.x;
        const centerY = this.y;
        const scaledWidth = this.width * this._scale;
        const scaledHeight = this.height * this._scale;
        const scaledCornerRadius = this.cornerRadius * this._scale;
      
        const drawX = centerX - scaledWidth / 2;
        const drawY = centerY - scaledHeight / 2;

        // Draw button border
        if(this.cornerRadius !== 0) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(drawX + scaledCornerRadius, drawY);
            ctx.lineTo(drawX + scaledWidth - scaledCornerRadius, drawY);
            ctx.arc(
                drawX + scaledWidth - scaledCornerRadius,
                drawY + scaledCornerRadius,
                scaledCornerRadius,
                1.5 * Math.PI,
                2 * Math.PI
            );
            ctx.lineTo(drawX + scaledWidth, drawY + scaledHeight - scaledCornerRadius);
            ctx.arc(
                drawX + scaledWidth - scaledCornerRadius,
                drawY + scaledHeight - scaledCornerRadius,
                scaledCornerRadius,
                0,
                0.5 * Math.PI
            );
            ctx.lineTo(drawX + scaledCornerRadius, drawY + scaledHeight);
            ctx.arc(
                drawX + scaledCornerRadius,
                drawY + scaledHeight - scaledCornerRadius,
                scaledCornerRadius,
                0.5 * Math.PI,
                Math.PI
            );
            ctx.lineTo(drawX, drawY + scaledCornerRadius);
            ctx.arc(drawX + scaledCornerRadius, drawY + scaledCornerRadius, scaledCornerRadius, Math.PI, 1.5 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

      
        // Draw button fill
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
        ctx.fill();
      
        // Draw button content
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillStyle = this._foreground;
        ctx.textAlign = "center";

        if (this.content.includes("icon")) {
            // if this is icon button draw icon image
            icon_images.get(this.content).Draw(centerX, centerY, true, new Point(this._scale,this._scale));
        } else {
            // if not just draw text content
            ctx.fillText(this.content, centerX, centerY + this.fontSize / 2);
        }    

        
    }
      
    
    // when user click on button process
    handleClick(event) {

        const rect = canvas.getBoundingClientRect();
        const drawX = this.x - this.width/2;
        const drawY = this.y - this.height/2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= drawX && x <= drawX + this.width &&
            y >= drawY && y <= drawY + this.height) {
            if(_DEBUG) this.createEditor();
            // console.log("Button clicked!");
            const handler = game_button_handlers.get(this.clickHandler);
            handler();

        }
    }


    
}

// Text display base class
class GameText {
    constructor(content, size, x, y, color) {
        this.content = content;
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.opacity = 1;
        this.family = "px Arial";
    }

    draw(){
        global.c2d.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        global.c2d.font = this.size + this.family;
        global.c2d.fillText(this.content, this.x, this.y);
    }

    setFontFamily(font){
        this.family = font;
    }
}

// flicker effect text class
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
        this.opacity = Math.sin((timePassed % this.interval) / this.interval * Math.PI);
        super.draw();


    }

}


