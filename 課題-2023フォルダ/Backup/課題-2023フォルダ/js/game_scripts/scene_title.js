/*
* Scene Game Title Logic
* */



function title_seq()
{
    switch( app.sequence_step )
    {
        case 0:
            let ready = true;
            for(let i= 0, c= GameImages.length ; i<c ; i++ )
            {
                ready = ready && GameImages[i].IsReady();
            }
            if( ready )
            {
                stage_manager.current = stage_manager.title;
                stage_manager.current.init();
                app.sequence_step++;
                hud_manager.changeMenu(hud_manager.title);
            }
            break;
        case 1:
            global.c2d.fillStyle = 'black';

            // Draw a filled rectangle covering the entire canvas
            global.c2d.fillRect(0, 0, canvas.width, canvas.height);

            // Update And Draw monster
            stage_manager.current.draw();

            // Display Title Icon
            let s = global.frameCount * 0.05;
            GameImages.title_logo.Draw(Screen.centerW + Math.sin( s ) * 8, 125 , true);
            
            break;
    }
    app.scaleBase=1.0+0.1*Math.sin(global.frameCount/15);
}