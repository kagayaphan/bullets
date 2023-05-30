/*
* User Interface Management Section
*/

// All UI buttons store in here
var buttons = [];

// Function to create a new button and add it to the list
function createButton(x, y, width, height, text, color, clickHandler) {
    var button = new Button(x, y, width, height, text, color, clickHandler);
    buttons.push(button);
    drawButtons();
}

// Draw all the buttons in the list
function drawButtons() {
    buttons.forEach(function(button) {
        button.draw(global.c2d);
    });
}

// Handle button click
function handleClick(event) {
    buttons.forEach(function(button) {
        button.handleClick(event);
    });
}

// Add event listener for button click
global.canvas.addEventListener("click", handleClick);

//----------- Game UI Design Here --------------

// test function button
createButton(100, 100, 100, 50, "Start", "blue", playParticles);

createButton(100, 200, 100, 50, "Stop", "blue", stopParticles);