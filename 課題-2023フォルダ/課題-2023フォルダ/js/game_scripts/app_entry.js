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
        // Wait for the particle images to load
        loadParticleImages(function () {
            // Start the animation loop after all images are loaded
            particleState = 1;
            // particleImageDatas.push(app.images.crab);
            // particleImageDatas.push(app.images.squid);
            // particleImageDatas.push(app.images.octopus);
            // animate();
        });

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

    // Start Scene Update
    app.sequence();

    // print debug output
    if(_DEBUG) $("out").innerHTML = global.mouse.ToString();
}

