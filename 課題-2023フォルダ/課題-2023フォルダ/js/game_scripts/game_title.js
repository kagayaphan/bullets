/*
* App Entry Point
*/

//! アプリのプロパティー
function App()
{
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
}

var app = new App;


//! タイトルシーケンス
function title_seq()
{
    switch( app.sequence_step )
    {
        case 0:
            var ready = true;
            for(var i= 0, c=app.images.length ; i<c ; i++ )
            {
                ready = ready && app.images[i].IsReady();
            }
            if( ready )
            {
                app.sequence_step++;
            }
            break;
        case 1:
            var y = 64*3, s = global.frameCount * 0.05;
            var iIdx= 0;
            app.images[4].Draw( global.canvas.width / 2 , 350, true );
            for(var i=1, c=app.images.length-1 ; i<c ; i++ )
            {
                var x = global.canvas.width / 2 + Math.sin( s ) * 16;
                app.images[i].scale=app.scaleBase;
                app.images[i].Draw( x , y, true );
                y += app.images[i].img.height/2;
                s += 0.5;
            }
            app.images[0].Draw( global.canvas.width / 2 , 96+Math.sin(s)*16, true );
            if( global.mouse.click )
            {
                this.sequence = main_seq;
            }
            break;
    }
    app.scaleBase=1.0+0.1*Math.sin(global.frameCount/15);
}

function main_seq()
{
    app.images[4].Draw( global.canvas.width / 2 , 256, true );
    app.images[0].Draw( global.canvas.width / 2 , 256-16, true );
    if( global.mouse.click )
    {
        this.sequence = title_seq;
    }
}

//! フレームアップデートメソッド
SetFrameUpdateFunc( frameUpdate );
function frameUpdate()
{
    // Clear Screen
    global.c2d.clearRect( 0, 0, global.canvas.width, global.canvas.height );
    // Start Scene Update
    app.sequence();
    // Start UI Update
    drawButtons();
    // print debug output
    $("out").innerHTML = global.mouse.ToString();
}

