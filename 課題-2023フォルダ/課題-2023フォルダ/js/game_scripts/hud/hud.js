/*
* User Interface Management Section
*/

//----------- Game UI Design Here --------------


// Base Menu Context
class Menu {
    constructor(buttons_data){
        this.buttons = [];
        this.flickerTexts = [];
        this.texts = [];
        this.init(buttons_data);
    }

    deInit(){
        this.buttons = [];
        this.flickerTexts = [];
        this.texts = [];
    }

    init(buttons_data){
        // loop though json format data to create button js object
        for (let i = 0; i < buttons_data.length; i++) {
            const data = buttons_data[i];        
            this.buttons.push(new Button(
                data.x, data.y, data.width, data.height,
                data.content, data.fontFamily, data.fontSize, data.foregroundOri, data.foregroundOver,
                data.red, data.green, data.blue, data.opacity, data.scale,
                data.clickHandler, data.cornerRadius
            ));
        }  
    }

    update(){
        this.buttons.forEach(function(button) {
            button.update();
        });
    }

    draw(){    

        this.drawTexts();
        this.drawButtons();
    
        if(_DEBUG){
            if(editorDragBars) {
                editorDragBars.forEach(function(bar) {
                    bar.draw();
                });
            }
        }        
    
        this.flickerTexts.forEach(function(text) {
            if(!text.visible) this.flickerTexts.remove(text);
        });
    }

    createFlickerTxt(content, size, x, y, color, duration, interval) {
        const flickerTxt = new FlickerText(content, size, x, y, color, duration, interval);
        this.flickerTexts.push(flickerTxt);
    }
    
    drawTexts() {
        global.c2d.textAlign = "center";
        this.flickerTexts.forEach(function(text) {
            text.draw(global.c2d);
        });
    }

    // Draw all the buttons in the list
    drawButtons() {
        this.buttons.forEach(function(button) {
            button.draw(global.c2d);
        });
    }

}

hud_manager = {
    // current menu
    current : null,
    // menu types
    title       :   new Menu(title_buttons_data),
    game        :   new Menu(game_buttons_data),
    home        :   new Menu(home_buttons_data),
    inventory   :   new Menu(inventory_buttons_data),

    // player message
    message     : "",
    message_timer : 0,
    message_in  : true,

    showMessage : function (x,y,size){
        if(this.message){
            if(this.message_in) {
                this.message_timer += deltaTime * 2;
                if(this.message_timer > 1.5){
                    this.message_in = false;
                }
            } else {
                this.message_timer -= deltaTime;
                if(this.message_timer < 0) {
                    this.message     = "";
                    this.message_timer = 0;
                    this.message_in  = true;
                }
            }

            if(!size){
                size = 30;
                x   = global.canvas.width/2;
                y   = global.canvas.height - 70;
            }
            global.c2d.save();
            global.c2d.font = `${size}px "Roboto Light", sans-serif`;
            global.c2d.fillStyle = 'rgba(255, 255, 255, ' + this.message_timer + ')';
            global.c2d.fillText(this.message, x,  y);
            global.c2d.restore();
        }

    },

    changeMenu : function(menu) {
        this.current = menu;
    },
}

hud_manager.title.createFlickerTxt("! ようこそ !",15, Screen.centerW, global.canvas.height - 15, "255, 255, 255", 9999, 1000);
hud_manager.home.createFlickerTxt("ステージを選択しましょう",15, Screen.centerW, global.canvas.height - 15, "255, 255, 255", 9999, 1000);

let _LEFTCTRL = false;
// Handle button click
function handleClickOnButtons(event) {
    if(hud_manager.current){
        hud_manager.current.buttons.forEach(function(button) {
            button.handleClick(event);
        });
    }    
}

// Add event listener for button click
global.canvas.addEventListener("click", handleClickOnButtons);


document.addEventListener('keydown', function(event) {
    // Check if the left Control key is pressed
    if (event.key === 'Control' && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
      console.log('Left Control key pressed');
      // Perform some action
      _LEFTCTRL = true;
    }
});

