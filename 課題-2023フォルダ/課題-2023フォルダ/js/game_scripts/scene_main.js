function main_seq()
{
    app.images[4].Draw( global.canvas.width / 2 , 256, true );
    app.images[0].Draw( global.canvas.width / 2 , 256-16, true );
    if( global.mouse.click )
    {
        this.sequence = title_seq;
    }
}