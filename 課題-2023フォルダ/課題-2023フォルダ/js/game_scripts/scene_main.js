function main_seq()
{
    app.images.get('nabefuta').Draw( global.canvas.width / 2 , 256, true );
    app.images.get('nabe').Draw( global.canvas.width / 2 , 256-16, true );
    if( global.mouse.click )
    {
        this.sequence = title_seq;
    }
}