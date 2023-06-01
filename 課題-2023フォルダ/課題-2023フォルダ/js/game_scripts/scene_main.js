function main_seq()
{
    GameImages.nabefuta.Draw( global.canvas.width / 2 , 256, true );
    GameImages.nabe.Draw( global.canvas.width / 2 , 256-16, true );

    if( global.mouse.click )
    {
        this.sequence = title_seq;
    }
}