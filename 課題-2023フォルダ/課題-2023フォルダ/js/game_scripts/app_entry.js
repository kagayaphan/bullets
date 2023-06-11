/*
* App Entry Point
*/

const originalFontSize = global.font;

let stage_manager = {
    current : null,
    nextStage : null,

    title   : new StageTitle(),
    home    : new StageHome(),
    stage01 : new Stage01(),
    stage02 : new Stage02(),
    stage03 : new Stage03(),

    pause   : false,

    updateCD : function (){
        this.stage01.coolDown();
        this.stage02.coolDown();
        this.stage03.coolDown();
    }
};



//! アプリのプロパティー
class App {
    constructor() {
        // Init & load all app resource at once
        this.sequence = startup;
        this.nextSequence = title_seq;
        this.sequence_step = 0;
        this.scaleBase = 1.0;

        initQuest();
        fadeOut();
    }
}

let app = new App;

//! フレームアップデートメソッド
SetFrameUpdateFunc( frameUpdate );



function frameUpdate()
{
    // Clear Screen
    global.c2d.clearRect( 0, 0, global.canvas.width, global.canvas.height );

    // Start Scene Update
    if(app.sequence) app.sequence();



    if(hud_manager.current) {
        if(stage_manager.current.effect_timer > 0 &&
            stage_manager.current.effect_timer < 3) return;
        hud_manager.current.update();
        hud_manager.current.draw();
        if(hud_manager.message) hud_manager.showMessage();
    }

    // print debug output need to update rapidly so put it here instead of toggle
    if(_DEBUG) {
        // mouse value
        $("mouseOut").innerHTML = global.mouse.ToString();

        // monster list        
        $("monsterList").innerHTML = stage_manager.current.ToString();
        
    } 
}




canvas.addEventListener('click', function(event) {
    if(stage_manager.current){
        if(stage_manager.current.harvest_time > 0 && !stage_manager.pause){
            const mouse = global.mouse;
            const point = new Point(mouse.up_pos.x,mouse.up_pos.y);
            // make sure player wont shot when click on UI
            if(point.y > player._pos.y) player.initShot(point);
        }
    }
});

document.addEventListener('keydown', function(event) {
    if(stage_manager.current){
        if(stage_manager.current.harvest_time > 0 && !stage_manager.pause){
            if (event.key === '1') {
                // Change weapon to NET
                selectNet();
            }
            if (event.key === '2') {
                // Change weapon to HARPOON
                selectHarpoon();
            }
            if (event.key === '3') {
                // Change weapon to BOMB
               selectBomb();
            }
        }
    }
});
