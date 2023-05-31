/*
* User Interface Management Section
*/



const title_buttons_data = [
    { x: 600, y: 250, width: 120, height: 50, content: "Start Game", red: 135, green: 156, blue: 255, handler: "createEditors"},
    { x: 600, y: 310, width: 120, height: 50, content: "Play Intro", red: 135, green: 156, blue: 255, handler: "createEditors"},
    { x: 600, y: 370, width: 120, height: 50, content: "Credits",    red: 135, green: 156, blue: 255, handler: "createEditors"},
];

function saveObject() {
    const data = JSON.stringify(title_buttons_data);
    localStorage.setItem('title_buttons_data', data);
}

function loadObject() {
    const data = localStorage.getItem('title_buttons_data');
    if (data) {
        title_buttons_data.length = 0; // Clear existing data in title_buttons_data array
        const loadedData = JSON.parse(data);
        Array.prototype.push.apply(title_buttons_data, loadedData);
        console.log(title_buttons_data);
    }
}

function initHUD() {
    // load data object json from localStorage
    // loadObject();

    // push all button to list
    createButton();

    // push all flicker text to list
    createFlickerTxt("カニ鍋",25, Screen.centerW, Screen.centerH, "255, 0, 0", 99999, 1000);
}




function drawHUD() {
    drawTexts();
    drawButtons();

    if(debugDragBar) {
        debugDragBar.forEach(function(bar) {
            bar.draw();
        });

    }

    flickerTexts.forEach(function(text) {
        if(!text.visible) flickerTexts.remove(text);
    });
    // Stop flickering after 5 seconds for testing
    // setTimeout(() => {
    //     flickerTexts = [];
    // }, 5000);
}

function createFlickerTxt(content, size, x, y, color, duration, interval) {
    const flickerTxt = new FlickerText(content, size, x, y, color, duration, interval);
    flickerTexts.push(flickerTxt);
}

function drawTexts() {
    flickerTexts.forEach(function(text) {
        text.draw(global.c2d);
    });
}


// Function to create a new button and add it to the list
function createButton() {
    buttons = [];
    title_buttons_data.forEach(function(data) {
        const handler = game_handlers.get(data.handler);
        const button = new Button(data.x, data.y, data.width, data.height, data.content, data.red , data.green, data.blue, handler);
        buttons.push(button);
    });
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

// UI object container
var buttons = []; // button container
var flickerTexts = []; // flicker text container
