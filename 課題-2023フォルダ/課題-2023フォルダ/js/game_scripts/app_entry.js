/*
* App Entry Point
*/
let stage_manager = {
    current : null,
    title : new StageTitle(),
    stage01 : new Stage01()
};

function startup(){

}
//! アプリのプロパティー
class App {
    constructor() {
        // Init & load all app resource at once
        this.sequence = startup;
        this.nextSequence = title_seq;
        this.sequence_step = 0;
        this.scaleBase = 1.0;
        particleState = 1;
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



    // print debug output
    if(_DEBUG) $("out").innerHTML = global.mouse.ToString();
}
