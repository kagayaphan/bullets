

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
            // var y = 64*3, s = global.frameCount * 0.05;
            // var iIdx= 0;
            // app.images[4].Draw( Screen.centerW , 350, true );
            // for(var i=1, c=app.images.length-1 ; i<c ; i++ )
            // {
            //     var x = Screen.centerW + Math.sin( s ) * 16;
            //     app.images[i].scale=app.scaleBase;
            //     app.images[i].Draw( x , y, true );
            //     y += app.images[i].img.height/2;
            //     s += 0.5;
            // }
            // app.images[0].Draw( Screen.centerW, 96+Math.sin(s)*16, true );
            // if( global.mouse.click )
            // {
            //     this.sequence = main_seq;
            // }

            // Start UI Update
            drawHUD()
            break;
    }
    app.scaleBase=1.0+0.1*Math.sin(global.frameCount/15);
}