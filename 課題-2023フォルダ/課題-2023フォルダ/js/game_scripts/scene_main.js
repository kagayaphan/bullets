function gotoMainScene(){
    app.nextSequence = main_seq;
    fadeOut();
}
let player = new Player(GameImages.boat, 1);

function main_seq()
{

    const mouse = global.mouse;

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

            initGameHud();
            break;
        case 1:
            
            if( mouse.up )
            {
                const point = new Point(mouse.up_pos.x,mouse.up_pos.y);
                // make sure player wont shot when click on UI 
                if(point.y > player._pos.y) player.initShot(point);
            }
            // update stage monster behaviors
            stage_manager.current.spawnMonsters();
            stage_manager.current.draw();

            // update user's player behavior
            player.update();
            player.draw();

            drawGameHud();

            break;
    }


}