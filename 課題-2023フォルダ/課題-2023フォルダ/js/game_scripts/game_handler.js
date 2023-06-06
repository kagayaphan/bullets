/*
    All Game Global Handler here
*/

function togglePause(){
    stage_manager.current.effect_timer = 0.1;
    stage_manager.pause = !stage_manager.pause;
}

function startup(){

}

function gotoTitle() {
    app.nextSequence = title_seq;
    fadeOut();
}

function gotoMainScene(){
    app.nextSequence = main_seq;
    fadeOut();
}

function gotoHome(){

}

function gotoStage01(){
    stage_manager.nextStage = stage_manager.stage01;
    fadeOut();
}


function showRestaurant(){

}

function openInventory(){
    togglePause();
    hud_manager.changeMenu(hud_manager.inventory);

}

function closeInventory(){
    togglePause();
    stage_manager.current.effect_timer = 0;
    hud_manager.changeMenu(hud_manager.game);

}

// Function Pointer Map
const game_button_handlers = new Map([
    ["toggleParticles", toggleParticles],
    ["gotoTitle", gotoTitle],
    ["gotoHome", gotoHome],
    ["gotoStage01", gotoStage01],
    ["gotoMainScene", gotoMainScene],
    ["showRestaurant", showRestaurant],
    ["openInventory", openInventory],
    ["closeInventory", closeInventory],
]);
