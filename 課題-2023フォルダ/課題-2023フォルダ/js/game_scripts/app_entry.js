/*
* App Entry Point
*/

//! アプリのプロパティー
function App()
{
    // Init & load all app resource at once
    this.sequence       = title_seq;
    this.sequence_step  = 0;
    this.images         = [
        new LoadImage( global.c2d, "image/nabe01.png" )
        ,new LoadImage( global.c2d, "image/texture00.png" )
        ,new LoadImage( global.c2d, "image/texture01.png" )
        ,new LoadImage( global.c2d, "image/texture02.png" )
        ,new LoadImage( global.c2d, "image/nabe00.png" )
    ];

    this.scaleBase      = 1.0;

    // Wait for the particle images to load
    loadParticleImages(function() {
        // Start the animation loop after all images are loaded
        particleState = 1;
        // animate();
    });

    initHUD();
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
    $("out").innerHTML = global.mouse.ToString();
}

