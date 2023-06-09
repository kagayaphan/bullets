/*
* Base Class And Tools Section
*/




const icon_images = new Map([
    ["icon_nabe",       GameImages.icon_nabe],
    ["icon_crab",       GameImages.icon_crab],
    ["icon_octopus",    GameImages.icon_octopus],
    ["icon_squid",      GameImages.icon_squid],
    ["icon_net",        GameImages.icon_net],
    ["icon_toTitle",    GameImages.icon_toTitle],
    ["icon_inventory",  GameImages.icon_inventory],
    ["icon_mapLocator", GameImages.icon_mapLocator],
]);

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

function drawCircle(pos, radius){
    const ctx = global.c2d;
    // Draw the circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function animateArrow(pointA, pointB) {
    const ctx = global.c2d;
    const arrow = new Point(pointA.x, pointA.y);
  
    function drawArrow() {
      ctx.clearRect(arrow.x - 15, arrow.y - 15, 30, 30); // Clear the area around the previous arrow
      ctx.beginPath();
      ctx.moveTo(arrow.x, arrow.y);
      ctx.lineTo(arrow.x + 10, arrow.y + 10);
      ctx.lineTo(arrow.x - 10, arrow.y + 10);
      ctx.closePath();
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  
    function animate() {
      drawArrow();
      arrow.x += (pointB.x - pointA.x) / 100;
      arrow.y += (pointB.y - pointA.y) / 100;
  
      if (arrow.x < pointB.x || arrow.y < pointB.y) {
        requestAnimationFrame(animate);
      }
    }
  
    animate();
}

function drawLaneMarkings(pointA, pointB) {   
    const ctx = global.c2d;
    // Set the line style
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2;

    // Define the spacing stop interval
    var spacingStopInterval = 10; // Adjust this value as needed
    var spacingStopLength = 10; // Adjust this value as needed

    // Calculate the distance between point A and B
    var distance = Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );

    // Calculate the unit vector for the line
    var dx = (pointB.x - pointA.x) / distance;
    var dy = (pointB.y - pointA.y) / distance;

    // Start drawing the lane marking
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);

    // Loop through spacing stops and draw the lane marking
    var currDistance = 0;
    while (currDistance < distance) {
      // Calculate the next spacing stop position
      var x = pointA.x + dx * currDistance;
      var y = pointA.y + dy * currDistance;

      // Move to the spacing stop position
      ctx.moveTo(x, y);

      // Check if the spacing stop should be empty
      if (currDistance % (spacingStopInterval + spacingStopLength) >= spacingStopInterval) {
        // Calculate the end point for the spacing stop
        var stopEndX = x + dx * spacingStopLength;
        var stopEndY = y + dy * spacingStopLength;

        // Draw the line segment
        ctx.lineTo(stopEndX, stopEndY);
      }

      // Increment the current distance by the spacing stop interval
      currDistance += spacingStopInterval;
    }

    ctx.stroke();
}

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

function drawBoard(x, y, width, height, opacity) {
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

function drawBlackBoard(x, y, width, height, textArray) {
    // Create a temporary canvas element dynamically
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = global.canvas.width;
    tempCanvas.height = global.canvas.height;

    // Get the 2D rendering context
    const ctx = tempCanvas.getContext('2d');
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


function animateBoardExpansion(x, y, targetWidth, targetHeight) {
    const maxWidth = 200;
    const maxHeight = 100;

    let currentWidth = 0;
    let currentHeight = 0;

    function updateBoard() {
        // Calculate the increment for width and height
        const widthIncrement = Math.ceil(targetWidth / 30);  // Adjust the increment as desired
        const heightIncrement = Math.ceil(targetHeight / 30); // Adjust the increment as desired

        // Update the current dimensions
        currentWidth = Math.min(currentWidth + widthIncrement, targetWidth, maxWidth);
        currentHeight = Math.min(currentHeight + heightIncrement, targetHeight, maxHeight);

        // Draw the board rectangle
        global.c2d.fillStyle = "black";
        global.c2d.fillRect(x, y, currentWidth, currentHeight);

        // Add any additional drawing or customization here

        // Example: Draw a border
        global.c2d.strokeStyle = "white";
        global.c2d.lineWidth = 2;
        global.c2d.strokeRect(x, y, currentWidth, currentHeight);

        // Request the next animation frame
        if (currentWidth < targetWidth || currentHeight < targetHeight) {
            requestAnimationFrame(updateBoard);
        }
    }

    // Start the animation
    updateBoard();
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






