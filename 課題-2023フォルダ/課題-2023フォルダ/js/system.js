// TODO: change this to false when submit
// var _DEBUG = false;
var _DEBUG = true;


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

//-------- Below Code Use To Prompt User To Input Json File just leave it there as sample later use ------------//

// const fileInput = document.getElementById('fileInput');
// const fileContent = document.getElementById('fileContent');
// let jsonData = null;

// fileInput.addEventListener('change', handleFileSelect, false);

// function handleFileSelect(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function(event) {
//     const content = event.target.result;
//     fileContent.textContent = content;

//     // Parse the JSON data into a JavaScript object
//     try {
//       jsonData = JSON.parse(content);
//       console.log('JSON data:', jsonData);
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//     }
//   };

//   reader.readAsText(file);
// }

// window.addEventListener('beforeunload', handlePageUnload, false);

// function handlePageUnload(event) {
//   if (jsonData !== null) {
//     // Convert the JavaScript object back to JSON string
//     const jsonString = JSON.stringify(jsonData);

//     // Create a new Blob with the JSON content
//     const file = new Blob([jsonString], { type: 'application/json' });

//     // Create a temporary link to download the file
//     const a = document.createElement('a');
//     const url = URL.createObjectURL(file);
//     a.href = url;
//     a.download = 'game_hud.json';
//     a.click();

//     // Revoke the temporary URL
//     URL.revokeObjectURL(url);
//   }
// }
