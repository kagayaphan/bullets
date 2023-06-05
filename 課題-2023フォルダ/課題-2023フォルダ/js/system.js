let _DEBUG = false;


function toggleDebugMode(){
  _DEBUG = !_DEBUG;
  var textBoxContainer = document.getElementById("textBoxContainer");
  var paragraphMouse = document.getElementById("mouseOut");
  var paragraphMonster = document.getElementById("monsterList");
  var buttons = document.getElementsByClassName("myButton");

  

  

  if(_DEBUG){
    textBoxContainer.classList.remove("hidden");
    paragraphMouse.classList.remove("hidden");
    paragraphMonster.classList.remove("hidden");
    for (var i = 0; i < buttons.length; i++) {
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
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("hidden");
    }
  }
}

function updateDebugValue(){
  var textBox = document.getElementById("myTextBox");
  var newValue = textBox.value;
  
  d_globalEnemySpeedMultiplier = newValue;
}

// export object to json file and print to console log to copy back to data file
function exportObject(title_buttons) {
    // const json = JSON.stringify(title_buttons);
    const json = JSON.stringify(title_buttons, (key, value) => {
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
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'title_buttons_data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize variables
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

