/*
* App Entry Point
*/

//! アプリのプロパティー
class App {
    constructor() {
        // Init & load all app resource at once
        this.sequence = title_seq;
        this.sequence_step = 0;
        this.scaleBase = 1.0;       
        particleState = 1;
        initHUD();
    }
}

var app = new App;

//! フレームアップデートメソッド
SetFrameUpdateFunc( frameUpdate );

function frameUpdate()
{
    // Clear Screen
    global.c2d.clearRect( 0, 0, global.canvas.width, global.canvas.height );

    global.c2d.fillStyle = 'black';

    // Draw a filled rectangle covering the entire canvas
    global.c2d.fillRect(0, 0, canvas.width, canvas.height);
    // Start Scene Update
    app.sequence();

    // print debug output
    if(_DEBUG) $("out").innerHTML = global.mouse.ToString();
}

