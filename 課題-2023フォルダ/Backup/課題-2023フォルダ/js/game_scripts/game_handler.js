/*
    All Game Handler here
*/




// Function Pointer Map
const game_button_handlers = new Map([
    ["gotoTitle", gotoTitle],
    ["gotoHome", gotoHome],
    ["gotoStage01", gotoStage01],
    ["gotoStage02", gotoStage02],
    ["gotoStage03", gotoStage03],
    ["gotoMainScene", gotoMainScene],
    ["toggleShowRestaurant", toggleShowRestaurant],
    ["openInventory", openInventory],
    ["closeInventory", closeInventory],
    ["getStageInfo01", getStageInfo01],
    ["getStageInfo02", getStageInfo02],
    ["getStageInfo03", getStageInfo03],
    ["navigateStage", navigateStage],
    ["playIntro", playIntro],
    ["upgradeNet", upgradeNet],
    ["upgradeHarpoon", upgradeHarpoon],
    ["upgradeBomb", upgradeBomb],
    ["upgradeRestaurant", upgradeRestaurant],
    ["selectNet", selectNet],
    ["selectHarpoon", selectHarpoon],
    ["selectBomb", selectBomb],
    ["toggleSound", toggleSound],
    ["toggleBgm", toggleBgm],
]);

function selectNet() {
    player.inventory.selectWeapon("net");
}

function selectHarpoon() {
    player.inventory.selectWeapon("harpoon");
}

function selectBomb() {
    player.inventory.selectWeapon("bomb");
}

// On-off game pause switch
    function togglePause(){
        stage_manager.current.effect_timer = 0.1;
        stage_manager.pause = !stage_manager.pause;
    }

// Select title sequence
    function gotoTitle() {
        app.nextSequence = title_seq;
        fadeOut();
    }

// Select main sequence
    function gotoMainScene(){
        app.nextSequence = main_seq;
        fadeOut();
    }

// Select home stage
    function gotoHome(){
        stage_manager.nextStage = stage_manager.home;
        fadeOut();
    }

// Select stage 1
    function gotoStage01(){
        stage_manager.nextStage = stage_manager.stage01;
        fadeOut();
    }

// Select stage 2
    function gotoStage02(){
        stage_manager.nextStage = stage_manager.stage02;
        fadeOut();
    }

// Select stage 3
    function gotoStage03(){
        stage_manager.nextStage = stage_manager.stage03;
        fadeOut();
    }

// Show restaurant info switch
    function toggleShowRestaurant(){
        player.restaurant._displayFullInfo = !player.restaurant._displayFullInfo;
        if(!player.restaurant._displayFullInfo) player.restaurant.closeInfoBoard();
    }

// Upgrade restaurant
    function upgradeRestaurant(){
        player.restaurant.upgrade();
    }

// Open player's inventory
    function openInventory(){
        togglePause();
        hud_manager.changeMenu(hud_manager.inventory);
        player.inventory.open();
    }

// Close player's inventory
    function closeInventory(){
        togglePause();
        stage_manager.current.effect_timer = 0;
        hud_manager.changeMenu(hud_manager.game);
        player.inventory.close();

    }

    function  getStageInfo01(){
        stage_manager.home.selectStage = stage_manager.stage01;
    }
    function  getStageInfo02(){
        stage_manager.home.selectStage = stage_manager.stage02;
    }
    function  getStageInfo03(){
        stage_manager.home.selectStage = stage_manager.stage03;
    }
    function  navigateStage(){
        if(stage_manager.current.selectStage){
            stage_manager.current.selectStage.stageNavHandler();
        }
    }

    function upgradeNet() {
        player.inventory.net.upgrade();
    }

    function upgradeHarpoon() {
        player.inventory.harpoon.upgrade();

    }

    function upgradeBomb() {
        player.inventory.bomb.upgrade();

    }

// Play some fun intro at title screen
    function playIntro(){
        hud_manager.setMessage("Welcome To My Restaurant");
        hud_manager.showMessage();
        createExplosion(randomNumber(50,800),randomNumber(50,450),200);
    }

// Application startup update by frame to fade in
    function startup(){}


