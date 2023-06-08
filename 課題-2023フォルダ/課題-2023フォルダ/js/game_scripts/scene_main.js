
let player = new Player(GameImages.boat, 1);

function main_seq()
{
    switch( app.sequence_step )
    {
        case 0:
            stage_manager.current = stage_manager.home;
            stage_manager.current.init();
            
            app.sequence_step++;
            break;
        case 1:
            // if stage not on pause state update it
            if(!stage_manager.pause) {
                stage_manager.current.update();                
            }
            // Draw Image Out
            stage_manager.current.draw();  

            break;
    }


}