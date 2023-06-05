/*
* User Interface Management Section
*/

//----------- Game UI Design Here --------------

// UI object container
let flickerTexts = []; // flicker text container
let buttons = []; // flicker text container

function deInitHUD(){
    flickerTexts = [];
    buttons = [];
}



function initGameHud(){
    // create button array with json data
    createGameButtons();
}

function drawGameHud(){
    buttons.forEach(function(button) {
        button.update();
    });
    drawTexts();
    drawButtons();

    if(_DEBUG){
        if(editorDragBars) {
            editorDragBars.forEach(function(bar) {
                bar.draw();
            });
        }
    }
    

    flickerTexts.forEach(function(text) {
        if(!text.visible) flickerTexts.remove(text);
    });
}

function createGameButtons(){
  // loop though json format data to create button js object
  for (let i = 0; i < game_buttons_data.length; i++) {
    const data = game_buttons_data[i];        
    buttons.push(new Button(
        data.x, data.y, data.width, data.height,
        data.content, data.fontFamily, data.fontSize, data.foregroundOri, data.foregroundOver,
        data.red, data.green, data.blue, data.opacity, data.scale,
        data.clickHandler, data.cornerRadius
    ));
}  
}




function initTitleHUD() {
    // create button array with json data
    createTittleButtons();
    // push all flicker text to list
    createFlickerTxt("! ようこそ !",15, Screen.centerW, global.canvas.height - 15, "255, 255, 255", 9999, 1000);
}

function drawTitleHUD() {

    buttons.forEach(function(button) {
        button.update();
    });
    drawTexts();
    drawButtons();

    if(editorDragBars) {
        editorDragBars.forEach(function(bar) {
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
function createTittleButtons() {
    // loop though json format data to create button js object
    for (let i = 0; i < title_buttons_data.length; i++) {
        const data = title_buttons_data[i];        
        buttons.push(new Button(
            data.x, data.y, data.width, data.height,
            data.content, data.fontFamily, data.fontSize, data.foregroundOri, data.foregroundOver,
            data.red, data.green, data.blue, data.opacity, data.scale,
            data.clickHandler, data.cornerRadius
        ));
    }    
}

// Draw all the buttons in the list
function drawButtons() {
    buttons.forEach(function(button) {
        button.draw(global.c2d);
    });
}

// Handle button click
function handleClickOnButtons(event) {
    buttons.forEach(function(button) {
        button.handleClick(event);
    });
}

// Add event listener for button click
global.canvas.addEventListener("click", handleClickOnButtons);


