function gotoMainScene(){
    app.nextSequence = main_seq;
    fadeOut();
}
let player = new Player(GameImages.boat, 1);

function main_seq()
{
    switch( app.sequence_step )
    {
        case 0:
            stage_manager.current = stage_manager.stage01;
            stage_manager.current.init();
            makeWaveEffect(stage_manager.current.wave);
            player.resetState();
            // TODO remove this line when release player need to buy weapon
            player.assignWeapon(new WeaponNet());
            app.sequence_step++;
            break;
        case 1:
            stage_manager.current.draw();
            const mouse = global.mouse;
            if( mouse.up )
            {
                const point = new Point(global.mouse.up_pos.x,global.mouse.up_pos.y);
                player.initShot(point);
            }
            player.update();
            player.draw();
            // detectCollisions();

            break;
    }


}