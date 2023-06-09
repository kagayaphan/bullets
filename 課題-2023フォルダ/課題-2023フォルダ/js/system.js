/*
* Application System Unit Test
*/

let _DEBUG = false;


function clearSave(){
    localStorage.clear();
}

function cheatMoney(){
    player.restaurant.addIncome(5000);
}

function toggleDebugMode(){
  _DEBUG = !_DEBUG;
  const textBoxContainer = document.getElementById("textBoxContainer");
  const paragraphMouse = document.getElementById("mouseOut");
  const paragraphMonster = document.getElementById("monsterList");
  const buttons = document.getElementsByClassName("myButton");

  if(_DEBUG){
    textBoxContainer.classList.remove("hidden");
    paragraphMouse.classList.remove("hidden");
    paragraphMonster.classList.remove("hidden");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("hidden");
    }
  } else {
    // clear editor bar handler
    editorDragBars.forEach(function(bar) {
      bar.destructor();
    });
    editorDragBars = [];

    // set hidden property to html tag
    textBoxContainer.classList.add("hidden");
    paragraphMouse.classList.add("hidden");
    paragraphMonster.classList.add("hidden");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("hidden");
    }
  }
}

function updateDebugValue(){
    const textBox = document.getElementById("myTextBox");
    d_globalEnemySpeedMultiplier = textBox.value;
}

// export object to json file and print to console log to copy back to data file
function exportObject() {
    const json = JSON.stringify(hud_manager.current.buttons, (key, value) => {
        if (key.startsWith('_')) {
          return undefined; // Exclude properties with a prefix underscore
        }
        return value; // Include other properties
      });
    // format the json to easier to edit
    let formattedJson = json.replace(/,\s*/g, ',');

    const closingBracketCommaRegex = /},/g;
    formattedJson = formattedJson.replace(closingBracketCommaRegex, '},\n\t');

    const openingBracketRegex = /\[{/g;
    formattedJson = formattedJson.replace(openingBracketRegex, '[\n\t{');

    const closingBracketRegex = /}]/g;
    formattedJson = formattedJson.replace(closingBracketRegex, '}\n]');

    console.log(formattedJson);
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buttons_data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize time variables
let previousTime = Date.now();
let deltaTime = 0;
// Update function
function update() {
    // Calculate delta time
    const currentTime = Date.now();
    deltaTime = (currentTime - previousTime) / 1000;  // Convert to seconds
    // Update previous time for next frame
    previousTime = currentTime;
    // Schedule next frame update
    requestAnimationFrame(update);
}

// Start animation
requestAnimationFrame(update);

