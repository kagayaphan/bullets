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
        for(const button of this.buttons){
            button.update();
        }
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
        for(const button of this.buttons){
            button.draw(global.c2d);
        }
        
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

    set_btn_weapons : [],
    set_btn_locators : [],

    high_light_btn : null,

    high_light_pos_x : 0,
    high_light_pos_y : 0,

    setHighlightWpButton :  function(btn){
        for(const button of this.set_btn_weapons){
            if(button.content.includes(btn)) {
                if(this.high_light_btn == null){
                    this.high_light_pos_x = button.x;
                    this.high_light_pos_y = button.y;
                }

                this.high_light_btn = button;
                break;
            }
        }
    },

    drawHighLightWpButton : function () {
        const vx = this.high_light_btn.x - this.high_light_pos_x;
        if(Math.abs(vx) > 1 ) {
            // get moving direction
            const sign = Math.sign(vx)
            // moving toward the direction
            this.high_light_pos_x += deltaTime * sign * 100;
        }
        // draw the rect with updated info
        drawBoard(this.high_light_pos_x,this.high_light_pos_y, this.high_light_btn.width * 1.3,this.high_light_btn.height* 1.3,0.2, true);
    },

    setMessage : function (mess){
        this.message = mess;
        this.message_timer = 0;
        this.message_in  = true;
    },

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
                size = 20;
                x   = global.canvas.width/2;
                y   = global.canvas.height - 70;
            }

            drawNotifyText(this.message, size, x, y, this.message_timer);
        }

    },

    changeMenu : function(menu) {
        this.current = menu;
    },
}

{
    for(const btn of hud_manager.game.buttons){
        if(btn.content.includes("wp")) hud_manager.set_btn_weapons.push(btn);
    }
    for(const btn of hud_manager.home.buttons){
        if(btn.content.includes("map")) hud_manager.set_btn_locators.push(btn);
    }
    hud_manager.setHighlightWpButton("net");
}


hud_manager.title.createFlickerTxt("! ようこそ !",15, Screen.centerW, global.canvas.height - 15, "255, 255, 255", 9999, 1000);
hud_manager.home.createFlickerTxt("ダブルクリックしてステージを開始します",15, Screen.centerW, global.canvas.height - 15, "255, 255, 255", 9999, 1000);

let _LEFTCTRL = false;
// Handle button click
function handleClickOnButtons(event) {
    if(hud_manager.current){
        let clickOnBtn = false;
        hud_manager.current.buttons.forEach(function(button) {
            if(button.handleClick(event)) clickOnBtn = true;
        });
        if(!clickOnBtn && stage_manager.current === stage_manager.home) stage_manager.home.selectStage = null;
    }    
}

function handleHomeNavigatorDb(event){
    if(stage_manager.current === stage_manager.home){
        for(const button of hud_manager.set_btn_locators) {
            if(!button.checkOver(event)) continue; // if not click on any button do nothing
            const selectedStage = stage_manager.current.selectStage;
            if(selectedStage && selectedStage.enable){
                selectedStage.stageNavHandler();
            }
        }
    }
}

global.canvas.addEventListener("dblclick", handleHomeNavigatorDb);

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

