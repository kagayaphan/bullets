/*
* User Interface Management Section
*/

//----------- Game UI Design Here --------------

// UI object container
var flickerTexts = []; // flicker text container
var title_buttons = []; // flicker text container

function initHUD() {
    // create button array with json data
    createTittleButtons();

    // push all flicker text to list
    createFlickerTxt("カニ鍋",90, Screen.centerW, 90, "255, 0, 0", 99999, 9000);
    createFlickerTxt("Press Any Button",15, Screen.centerW, global.canvas.height - 15, "255, 255,255", 9999, 1000);
}


  



function drawHUD() {

    GameImages.nabe.Draw(global.canvas.width / 2 , 256, true ,0.3);
    GameImages.nabefuta.Draw(global.canvas.width / 2 , 218, true ,0.3);

    title_buttons.forEach(function(button) {
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
        title_buttons.push(new Button(
            data.x, data.y, data.width, data.height,
            data.content, data.fontFamily, data.fontSize, data.foregroundOri, data.foregroundOver,
            data.red, data.green, data.blue, data.opacity,
            data.clickHandler, data.cornerRadius
          ));
      }    
}

// Draw all the buttons in the list
function drawButtons() {
    title_buttons.forEach(function(button) {
        button.draw(global.c2d);
    });
}

// Handle button click
function handleClickOnButtons(event) {
    title_buttons.forEach(function(button) {
        button.handleClick(event);

    });
}

// function handleOverOnButtons(event) {
//     title_buttons.forEach(function(button) {
//         button.handleMouseOver(event);
//     });
// }


// Add event listener for button click
global.canvas.addEventListener("click", handleClickOnButtons);


