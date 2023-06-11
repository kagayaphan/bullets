/*
* Base Class And Tools Section
*/



// all listed icon use by button
const icon_images = new Map([
    ["icon_nabe",           GameImages.icon_nabe],
    ["icon_crab",           GameImages.icon_crab],
    ["icon_octopus",        GameImages.icon_octopus],
    ["icon_squid",          GameImages.icon_squid],
    ["icon_wp_net",         GameImages.icon_wp_net],
    ["icon_wp_harpoon",     GameImages.icon_wp_harpoon],
    ["icon_wp_bomb",        GameImages.icon_wp_bomb],
    ["icon_toTitle",        GameImages.icon_toTitle],
    ["icon_inventory",      GameImages.icon_inventory],
    ["icon_mapLocator",     GameImages.icon_mapLocator],
    ["icon_sound",          GameImages.icon_sound],
    ["icon_bgm",            GameImages.icon_bgm],
    ["icon_bgm24",          GameImages.icon_bgm24],
]);

// draw a simple line
function drawLine(from, to, size, color){
    // Draw Line
    const ctx = global.c2d;
    // Start the path
    ctx.beginPath();
    // Set the starting point
    ctx.moveTo(from.x, from.y);
    // Set the end point and draw the Line
    ctx.lineTo(to.x, to.y);
    // Set Line style properties
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    // Draw Rope
    ctx.stroke();
}

// draw a simple circle centered
function drawCircle(pos, radius){
    const ctx = global.c2d;
    // Draw the circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

// draw a text in side a board
function drawNotifyText(text, txtSize, x, y, opacity = 1){
    const boardW = txtSize * text.length +30;
    const boardH = txtSize* 2;
    drawBoard(x - boardW/2,y-boardH / 1.5, boardW,boardH,0.75);

    global.c2d.save();
    global.c2d.font = `${txtSize}px "Roboto Light", sans-serif`;
    global.c2d.fillStyle = 'rgba(200, 150, 60, ' + opacity + ')';
    global.c2d.fillText(text, x,  y);
    global.c2d.restore();
}

// draw a string inside a box and auto step down
function drawStringInSpace(text, x, y, width, height) {
    // Save the current context state
    global.c2d.save();

    // Set the font and fill style
    global.c2d.font = `15px "Roboto Light", sans-serif`;
    global.c2d.fillStyle = 'white';

    // Calculate the maximum number of lines that can fit within the height
    // const lineHeight = global.c2d.measureText("M").width;
    const lineHeight = 22;
    const maxLines = Math.floor(height / lineHeight);

    // Split the text into multiple lines if needed
    const lines = splitTextIntoLines(text, width, maxLines);

    // Calculate the vertical position for the text
    const textY = y + (height - lineHeight * lines.length) / 2;

    // Draw each line of the text
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const textX = x + (width - global.c2d.measureText(line).width) / 2;
        // global.c2d.textAlign = "center";
        global.c2d.fillText(line, textX, textY + i * lineHeight);
    }

    // Restore the previous context state
    global.c2d.restore();
}

// support function for draw lane marking
function splitTextIntoLines(text, maxWidth, maxLines) {
    const words = text.split(' ');
    let currentLine = '';
    const lines = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;
        const testWidth = global.c2d.measureText(testLine).width;

        if (testWidth > maxWidth && lines.length < maxLines) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }

    lines.push(currentLine);

    return lines;
}

function drawText(text, x, y, fontSize) {
    // Assuming global.c2d represents the 2D context of a canvas element

    // Save the current context state
    global.c2d.save();

    // Set the font and fill style
    global.c2d.font = `${fontSize}px "Roboto Light", sans-serif`;
    global.c2d.fillStyle = 'white';

    // Draw the text at the specified position
    global.c2d.fillText(text, x, y);

    // Restore the previous context state
    global.c2d.restore();
}

// Display a text then disappear after time
function drawQuestInstruct(text, x, y, size, displayTime) {
    // Assuming global.c2d represents the 2D context of a canvas element

    const fadeInDuration = 500; // Duration of the fade-in animation in milliseconds
    const fadeOutDuration = 500; // Duration of the fade-out animation in milliseconds
    const fadeOutDelay = displayTime - fadeOutDuration; // Delay before starting the fade-out animation

    // Start with full transparency
    let opacity = 0;

    // Start the animation loop
    const startTimestamp = Date.now();
    requestAnimationFrame(animate);

    function animate() {
        const currentTimestamp = Date.now();
        const elapsed = currentTimestamp - startTimestamp;

        if (elapsed < fadeInDuration) {
            // Fade-in animation
            opacity = elapsed / fadeInDuration;
        } else if (elapsed < fadeOutDelay) {
            // Fully opaque display
            opacity = 1;
        } else if (elapsed < displayTime) {
            // Fade-out animation
            opacity = 1 - (elapsed - fadeOutDelay) / fadeOutDuration;
        } else {
            // Animation complete, exit the function

            return;
        }
        // Save the current context state
        global.c2d.save();
        // Set the font and fill style for the text
        global.c2d.font = `${size}px "Roboto Light", sans-serif`;
        global.c2d.fillStyle = `rgba(0, 0, 128, ${opacity})`;
        global.c2d.textAlign = 'center';

        // Draw the text at the specified position
        global.c2d.fillText(text, x, y);
        global.c2d.restore();
        // Continue the animation loop
        requestAnimationFrame(animate);
    }
}


// draw a line with empty space step
function drawLaneMarkings(pointA, pointB) {   
    const ctx = global.c2d;
    // Set the line style
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2;

    // Define the spacing stop interval
    let spacingStopInterval = 10; // Adjust this value as needed
    let spacingStopLength = 10; // Adjust this value as needed

    // Calculate the distance between point A and B
    let distance = Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );

    // Calculate the unit vector for the line
    let dx = (pointB.x - pointA.x) / distance;
    let dy = (pointB.y - pointA.y) / distance;

    // Start drawing the lane marking
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);

    // Loop through spacing stops and draw the lane marking
    let currDistance = 0;
    while (currDistance < distance) {
      // Calculate the next spacing stop position
        let x = pointA.x + dx * currDistance;
        let y = pointA.y + dy * currDistance;

      // Move to the spacing stop position
      ctx.moveTo(x, y);

      // Check if the spacing stop should be empty
      if (currDistance % (spacingStopInterval + spacingStopLength) >= spacingStopInterval) {
        // Calculate the end point for the spacing stop
          let stopEndX = x + dx * spacingStopLength;
          let stopEndY = y + dy * spacingStopLength;

        // Draw the line segment
        ctx.lineTo(stopEndX, stopEndY);
      }

      // Increment the current distance by the spacing stop interval
      currDistance += spacingStopInterval;
    }

    ctx.stroke();
}


// Draw a rectangle shape with soft corner
function drawRoundedRectangle(x, y, width, height, cornerRadius, backgroundColor, borderColor) {
    global.c2d.beginPath();
    global.c2d.moveTo(x + cornerRadius, y);
    global.c2d.lineTo(x + width - cornerRadius, y);
    global.c2d.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    global.c2d.lineTo(x + width, y + height - cornerRadius);
    global.c2d.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
    global.c2d.lineTo(x + cornerRadius, y + height);
    global.c2d.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    global.c2d.lineTo(x, y + cornerRadius);
    global.c2d.quadraticCurveTo(x, y, x + cornerRadius, y);
    global.c2d.closePath();

    global.c2d.fillStyle = backgroundColor;
    global.c2d.fill();

    global.c2d.strokeStyle = borderColor;
    global.c2d.lineWidth = 2;
    global.c2d.stroke();
}

// Draw a black board only
function drawBoard(x, y, width, height, opacity, center = false) {
    if(center){
        x = x - width/2;
        y = y - height/2;
    }


    // Calculate the actual width and height based on the maximum limits
    const actualWidth = width;
    const actualHeight = height;

    // Draw the board rectangle with the specified opacity
    global.c2d.fillStyle = `rgba(0, 0, 0, ${opacity})`;
    global.c2d.fillRect(x, y, actualWidth, actualHeight);

    // Add any additional drawing or customization here

    // Example: Draw a border with the specified opacity
    global.c2d.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    global.c2d.lineWidth = 2;
    global.c2d.strokeRect(x, y, actualWidth, actualHeight);
}

// Draw simple black board with text array on it
function drawBlackBoard(x, y, width, height, textArray) {
    // Create a temporary canvas element dynamically
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = global.canvas.width;
    tempCanvas.height = global.canvas.height;

    // Draw the black board
    global.c2d.fillStyle = 'black';
    global.c2d.fillRect(x, y, width, height);

    // Draw the curved border
    const cornerRadius = 20;
    global.c2d.lineWidth = 2;
    global.c2d.strokeStyle = 'white';
    global.c2d.beginPath();
    global.c2d.moveTo(x + cornerRadius, y);
    global.c2d.arcTo(x + width, y, x + width, y + height, cornerRadius);
    global.c2d.arcTo(x + width, y + height, x, y + height, cornerRadius);
    global.c2d.arcTo(x, y + height, x, y, cornerRadius);
    global.c2d.arcTo(x, y, x + width, y, cornerRadius);
    global.c2d.closePath();
    global.c2d.stroke();

    // Calculate the maximum font size that fits the text inside the board
    let fontSize = 20;
    let lineHeight = 32; // modify this to make the spacing larger
    let textHeight = lineHeight * textArray.length;
    while (textHeight > height - 20) {
        fontSize--;
        lineHeight--;
        textHeight = lineHeight * textArray.length;
    }

    // Draw the text inside the board
    global.c2d.fillStyle = 'white';
    global.c2d.textAlign = 'center';

    for (let i = 0; i < textArray.length; i++) {
        const text = textArray[i];
        const textY = y + 25 + i * lineHeight + (lineHeight - fontSize) / 2;
        global.c2d.fillText(text, x + width / 2, textY);
    }
}

// Draw black board with grid inside
function drawGridBoard(x, y, width, height, col, row, opacity) {
    const borderRadius = 8;
    const columnCount = col;
    const columnLineWidth = 2;

    // Calculate the starting x-coordinate based on the width and x position
    const startX = x - width;

    // Draw the black board with border radius and opacity
    const boardColor = `rgba(55, 55, 55, ${opacity})`;

    global.c2d.fillStyle = boardColor;
    global.c2d.strokeStyle = boardColor;
    global.c2d.lineWidth = borderRadius;
    global.c2d.beginPath();
    global.c2d.moveTo(startX + borderRadius, y);
    global.c2d.lineTo(startX + width - borderRadius, y);
    global.c2d.quadraticCurveTo(startX + width, y, startX + width, y + borderRadius);
    global.c2d.lineTo(startX + width, y + height - borderRadius);
    global.c2d.quadraticCurveTo(startX + width, y + height, startX + width - borderRadius, y + height);
    global.c2d.lineTo(startX + borderRadius, y + height);
    global.c2d.quadraticCurveTo(startX, y + height, startX, y + height - borderRadius);
    global.c2d.lineTo(startX, y + borderRadius);
    global.c2d.quadraticCurveTo(startX, y, startX + borderRadius, y);
    global.c2d.closePath();
    global.c2d.fill();

    // Draw the column lines with opacity
    const columnLineColor = `rgba(255, 255, 255, ${opacity})`;

    global.c2d.lineWidth = columnLineWidth;
    global.c2d.strokeStyle = columnLineColor;
    const columnWidth = width / columnCount;
    for (let i = 1; i < columnCount; i++) {
        const columnX = startX + i * columnWidth;
        global.c2d.beginPath();
        global.c2d.moveTo(columnX, y + height * 0.2);
        global.c2d.lineTo(columnX, y + height * 0.8);
        global.c2d.stroke();
    }
}

// Draw multi line of texts
function drawTextArray(x, y, textArray, fontSize) {
    global.c2d.font = `${fontSize}px "Roboto Light", sans-serif`;
    global.c2d.fillStyle = "white";
    global.c2d.textAlign = "left";
    const spacing = fontSize + 5; // Adjust spacing between lines

    for (let i = 0; i < textArray.length; i++) {
        global.c2d.fillText(textArray[i], x, y + i * spacing);
    }
}


function drawClockCircle(x, y, radius, percent) {
    percent = Math.round(percent);
    const startAngle = -Math.PI / 2; // Start angle at the top
    const endAngle = startAngle + (2 * Math.PI * percent) / 100; // Calculate end angle based on percentage
    const cooldownColor = "rgba(0, 0, 0, 0.1)"; // Background cool down color
    const fillColor = "rgba(0, 0, 0, 0.4)"; // Circle fill color
    const cooldownLineWidth = radius * 0.9; // Cool down line width
    const fontSize = 14; // Font size for the percentage text

    // Draw cool down background
    global.c2d.lineWidth = cooldownLineWidth;
    global.c2d.strokeStyle = cooldownColor;
    global.c2d.beginPath();
    global.c2d.arc(x, y, radius, 0, 2 * Math.PI);
    global.c2d.stroke();

    // Draw the filled portion based on percentage
    global.c2d.lineWidth = cooldownLineWidth;
    global.c2d.strokeStyle = fillColor;
    global.c2d.beginPath();
    global.c2d.arc(x, y, radius, startAngle, endAngle);
    global.c2d.stroke();

    // Draw the percentage text at the center of the circle
    const text = percent + "%";
    global.c2d.font = `${fontSize}px Roboto`;
    if(percent < 50){
        global.c2d.fillStyle = "white";
    } else if(percent < 85){
        global.c2d.fillStyle = "yellow";
    } else {
        global.c2d.fillStyle = "red";

    }
    global.c2d.textAlign = "center";
    global.c2d.fillText(text, x, y);
}

// object debug parameter array
let editorDragBars = [];

// easy handling bar object temmporary use only for UI design
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






