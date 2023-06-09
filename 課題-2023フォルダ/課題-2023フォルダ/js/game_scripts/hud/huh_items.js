

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
        this.scale = scale;
        this._foreground = foregroundOri;
        this._opacityOri = opacity;
        this._scale = scale;
        this._angle = 1;
        this._enable = true;
    }

    enable(){
        this._enable = true;
    }

    disable(){
        this._enable = false;
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
        global.c2d.save();
        const centerX = this.x;
        const centerY = this.y;
        const scaledWidth = this.width * this._scale;
        const scaledHeight = this.height * this._scale;
        const scaledCornerRadius = this.cornerRadius * this._scale;

        const drawX = centerX - scaledWidth / 2;
        const drawY = centerY - scaledHeight / 2;

        // Draw button border if cornerRadius # 0
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




        // If this button content is icon i dont want it to be draw background
        if (this.content.includes("icon")) {
            // if this is icon button draw icon image
            icon_images.get(this.content).Draw(centerX, centerY, true, new Point(this._scale,this._scale),this._angle);
        } else {
            // fill button background
            let color = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
            if(!this._enable) color = "gray";
            ctx.fillStyle = color;
            ctx.fill();
            // Draw button text content
            ctx.font = this.fontSize + "px " + this.fontFamily;
            ctx.fillStyle = this._foreground;
            ctx.textAlign = "center";
            // if not just draw text content
            ctx.fillText(this.content, centerX, centerY + this.fontSize / 2);
        }
        global.c2d.restore(); // Restore font after render


    }


    // when user click on button process
    handleClick(event) {
        if(!this._enable) return;

        const rect = canvas.getBoundingClientRect();
        const drawX = this.x - this.width/2;
        const drawY = this.y - this.height/2;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= drawX && x <= drawX + this.width &&
            y >= drawY && y <= drawY + this.height) {
            if(_DEBUG && _LEFTCTRL) {this.createEditor(); return}
            this._scale = 0.9;
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