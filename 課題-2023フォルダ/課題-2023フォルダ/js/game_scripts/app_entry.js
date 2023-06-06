/*
* App Entry Point
*/
let stage_manager = {
    current : null,    
    nextStage : null,

    title   : new StageTitle(),
    home    : new StageHome(),
    stage01 : new Stage01(),
    pause   : false
};



//! アプリのプロパティー
class App {
    constructor() {
        // Init & load all app resource at once
        this.sequence = startup;
        this.nextSequence = title_seq;
        this.sequence_step = 0;
        this.scaleBase = 1.0;
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
        hud_manager.current.update();
        hud_manager.current.draw();
    }
    // print debug output need to update rapidly so put it here instead of toggle
    if(_DEBUG) {
        // mouse value
        $("mouseOut").innerHTML = global.mouse.ToString();

        // monster list        
        $("monsterList").innerHTML = stage_manager.current.ToString();
        
    } 
}
