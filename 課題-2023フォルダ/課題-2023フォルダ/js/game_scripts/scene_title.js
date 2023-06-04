/*
* Scene Game Title Logic
* */

function gotoTitle() {
    app.nextSequence = title_seq;
    fadeOut();
}

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
                app.sequence_step++;
                initTitleHUD();
            }
            break;
        case 1:
            global.c2d.fillStyle = 'black';

            // Draw a filled rectangle covering the entire canvas
            global.c2d.fillRect(0, 0, canvas.width, canvas.height);
            // Draw title background
            // stage_manager.current.background.Draw(0,50,false);

            // Capture the canvas image
            // Apply blur effect to the background image data
            // applyBlurEffect(testVar+= 0.05);

            // Update And Draw monster
            stage_manager.current.draw();

            // Display Title Icon
            let s = global.frameCount * 0.05;
            GameImages.title_logo.Draw(Screen.centerW + Math.sin( s ) * 8, 125 , true);
            // Display Title Text
            // let gameTitleTxt = new GameText("カニ鍋",90, Screen.centerW, 90, "255, 0, 0");
            // gameTitleTxt.draw();
            // Start UI Update
            drawTitleHUD()
            break;
    }
    app.scaleBase=1.0+0.1*Math.sin(global.frameCount/15);
}